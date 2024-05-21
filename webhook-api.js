const preventable = document.getElementById('background-prevent');
const popup = document.getElementById('submitted');
const form = document.getElementById('application-form');

async function submitHandler(e) {
    e.preventDefault();
    
    const discordUsername = document.getElementById('discord-username').value;
    const discordTag = document.getElementById('discord-tag').value;
    const firstName = document.getElementById('first-name').value;
    const visaChoice = document.querySelector('input[name="visa-choice"]:checked').value;
    const visaReason = document.getElementById('visa-reason').value;

    const webhookContent = {
        embeds: [{
            title: 'Crafty Gamers Visa Application',
            color: 0x0099ff,
            timestamp: new Date(),
            fields: [
                { name: 'Discord User', value: discordUsername + '#' + discordTag },
                { name: 'First Name', value: firstName },
                { name: 'Visa Choice', value: visaChoice },
                { name: 'Application Reason', value: visaReason }
            ]
        }],
    };

    var webhookUrl = process.env.WEBHOOK_URL;

    fetch(webhookUrl, {
        "method":"POST",
        "headers": {"Content-Type": "application/json"},
        "body": JSON.stringify(webhookContent),
        })
        .then(res=> console.log(res))
        .then(preventable.style.visibility = "visible")
        .then(popup.style.visibility = "visible")
        .catch(err => console.error(err));
}

async function resetForm() {
    preventable.style.visibility = "hidden";
    popup.style.visibility = "hidden";
    form.reset();
}
