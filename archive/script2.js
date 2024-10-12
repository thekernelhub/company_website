document.getElementById('ContactUs').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    const data = {
        name: formData.get('nameInput'),
        email: formData.get('emailInput'),
        countryInput: formData.get('countryInput'),
        phoneInput: formData.get('phoneInput'),
        messageinput: formData.get('messageinput')
    };

    try {
        const response = await fetch('/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('Message sent successfully!');
        } else {
            alert('Failed to send message.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to send message.');
    }
});