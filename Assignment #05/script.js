const rooms = [
    {
        id: "room-101",
        name: "Room 101 - Lecture Hall",
        capacity: 50,
        equipment: ["Projector", "Whiteboard", "Video Conference"],
        blocked: false,
        bookings: [{ start: "12:00", end: "13:00" }]
    },
    {
        id: "room-102",
        name: "Room 102 - Seminar Room",
        capacity: 15,
        equipment: ["Whiteboard"],
        blocked: false,
        bookings: [{ start: "10:30", end: "11:30" }]
    },
    {
        id: "room-103",
        name: "Room 103 - Lab Room",
        capacity: 25,
        equipment: ["Projector", "Whiteboard"],
        blocked: true,
        bookings: []
    },
    {
        id: "room-104",
        name: "Room 104 - Discussion Hub",
        capacity: 8,
        equipment: ["Video Conference"],
        blocked: false,
        bookings: [{ start: "14:00", end: "15:00" }]
    }
];

const currentTimeMinutes = 10 * 60;

function isValidTime(timeStr) {
    if (typeof timeStr !== "string") {
        return false;
    }

    const timePattern = /^([0-9]{2}):([0-9]{2})$/;
    const match = timeStr.match(timePattern);

    if (!match) {
        return false;
    }

    const hours = Number(match[1]);
    const minutes = Number(match[2]);

    return hours >= 0 && hours <= 23 &&
           minutes >= 0 && minutes <= 59;
}

function timeToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
}

function initRooms(roomsToDisplay) {
    const select = document.getElementById('roomSelect');
    select.innerHTML = '';
    
    if (roomsToDisplay.length === 0) {
        select.innerHTML = '<option value="">No rooms match criteria</option>';
        document.getElementById('roomDetails').innerHTML = '<div class="result info">Empty State: No rooms satisfy the selected capacity and equipment requirements.</div>';
        return;
    }

    roomsToDisplay.forEach(room => {
        const option = document.createElement('option');
        option.value = room.id;
        option.text = `${room.name} (Cap: ${room.capacity}, Eq: ${room.equipment.join(', ')}) ${room.blocked ? '[BLOCKED]' : ''}`;
        select.appendChild(option);
    });

    updateRoomDetailsInfo();
}

function getFilteredRooms(reqCapacity, reqEquipment) {
    return rooms.filter(room => {
        if (room.blocked) return false;
        if (room.capacity < reqCapacity) return false;
        for (let eq of reqEquipment) {
            if (!room.equipment.includes(eq)) return false;
        }
        return true;
    });
}

function filterRooms() {
    const reqCapacity = parseInt(document.getElementById('requiredCapacity').value) || 0;
    const selectedEqCheckboxes = document.querySelectorAll('input[name="eq"]:checked');
    const reqEquipment = Array.from(selectedEqCheckboxes).map(cb => cb.value);

    const filtered = getFilteredRooms(reqCapacity, reqEquipment);
    initRooms(filtered);
    document.getElementById('result').style.display = 'none';
}

function updateRoomDetailsInfo() {
    const roomId = document.getElementById('roomSelect').value;
    const room = rooms.find(r => r.id === roomId);
    const detailsDiv = document.getElementById('roomDetails');
    
    if (!room) {
        detailsDiv.innerHTML = '';
        return;
    }

    let bookingsHtml = room.bookings.length > 0 
        ? room.bookings.map(b => `<li>${b.start} - ${b.end}</li>`).join('') 
        : '<li>None</li>';

    detailsDiv.innerHTML = `
        <strong>Selected Room Details:</strong><br>
        - Name: ${room.name}<br>
        - Capacity: ${room.capacity} attendees<br>
        - Equipment: ${room.equipment.join(', ')}<br>
        - Status: ${room.blocked ? '<span style="color:red">Blocked</span>' : '<span style="color:green">Active</span>'}<br>
        - Existing Bookings: <ul>${bookingsHtml}</ul>
    `;
}

document.getElementById('roomSelect').addEventListener('change', updateRoomDetailsInfo);

function checkAvailability() {
    const roomId = document.getElementById('roomSelect').value;
    const startStr = document.getElementById('startTime').value;
    const duration = parseInt(document.getElementById('duration').value);
    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';

    const room = rooms.find(r => r.id === roomId);
    if (!room) {
        resultDiv.className = "result error";
        resultDiv.innerText = "Error: Please select a valid available room.";
        return;
    }

    if (room.blocked) {
        resultDiv.className = "result error";
        resultDiv.innerText = "Error: This room is blocked and cannot be booked.";
        return;
    }

    if (isNaN(duration) || duration <= 0 || duration > 120) {
        resultDiv.className = "result error";
        resultDiv.innerText = "Error: Duration must be between 1 and 120 minutes.";
        return;
    }

    if (!isValidTime(startStr)) {
        resultDiv.className = "result error";
        resultDiv.innerText = "Error: Please enter a valid time in HH:MM format.";
        return;
    }

    const startMin = timeToMinutes(startStr);
    const endMin = startMin + duration;

    if (startMin <= currentTimeMinutes) {
        resultDiv.className = "result error";
        resultDiv.innerText = "Error: Start time must be strictly after the current time (10:00).";
        return;
    }

    for (let booking of room.bookings) {
        const bStart = timeToMinutes(booking.start);
        const bEnd = timeToMinutes(booking.end);

        if (startMin < bEnd && endMin > bStart) {
            resultDiv.className = "result error";
            resultDiv.innerText = `Unavailable: Time overlaps with existing booking (${booking.start} - ${booking.end}).`;
            return;
        }
    }

    resultDiv.className = "result success";
    resultDiv.innerText = `Success: ${room.name} is available for the selected time slot!`;
}

window.onload = function() {
    filterRooms();
};