fetch('http://localhost:3000/api/auth/profile', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJGU0ZAZ21haWwuY29tIiwiaWF0IjoxNzQ2Njg1NDk3LCJleHAiOjE3NDY2ODkwOTd9.7pO8C2IQBe0LLJfGZpRaZm5K_m6aXH8fUVYDyfSi4SE`
    }
  })
    .then(response => response.json())
    .then(data => console.log(data));
  