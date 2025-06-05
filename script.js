function fetchUsers() {
  const userList = document.getElementById("user-list");
  const errorMessage = document.getElementById("error-message");

  userList.innerHTML = "";
  errorMessage.textContent = "";

  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      return response.json();
    })
    .then((users) => {
      // Shuffle users array
      users = shuffleArray(users);

      users.forEach((user) => {
        const card = document.createElement("div");
        card.classList.add("user-card");
        card.innerHTML = `
          <h3>${user.name}</h3>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
        `;
        userList.appendChild(card);
      });
    })
    .catch(() => {
      errorMessage.textContent = "Failed to fetch users. Please check your internet connection.";
    });
}

// Fisher-Yates Shuffle function
function shuffleArray(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}
