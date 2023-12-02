const urlGET = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/8WNv70IZopewNg7O8fju/scores/';
const urlPOST = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/8WNv70IZopewNg7O8fju/scores/';

const sc = document.getElementById('sc');
const scoresList = document.getElementById('scoresList');

const fetchData = () => {
    fetch(urlGET, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network Response was not OK');
            }
            return response.json();
        })
        .then((data) => {
            console.log('Fetched data:', data);
            displayScores(data.result);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
};

const displayScores = (scores) => {
    console.log('Displaying scores:', scores);
    scoresList.innerHTML = '';

    scores.forEach((score) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${score.user}: ${score.score}`;


        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteScore(score.id));
        listItem.appendChild(deleteButton);

        scoresList.appendChild(listItem);
    });
};

const deleteScore = (scoreId) => {
    fetch(`${urlGET}${scoreId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Network Response was not OK');
        }
        return response.json();
    })
    .then((responseData) => {
        console.log('Score deleted successfully:', responseData);
        fetchData(); // Fetch and display updated scores after deleting
    })
    .catch((error) => {
        console.error('Error deleting score:', error);
    });
};


const submitScore = () => {
    const username = document.getElementById('username').value;
    const score = document.getElementById('score').value;

    if (!username || !score) {
        alert('Please enter both username and score.');
        return;
    }

    const data = {
        user: username,
        score: parseInt(score),
    };

    fetch(urlPOST, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network Response was not OK');
            }
            return response.json();
        })
        .then((responseData) => {
            console.log('Score submitted successfully:', responseData);
            fetchData();
        })
        .catch((error) => {
            console.error('Error submitting score:', error);
        });
};


fetchData();
