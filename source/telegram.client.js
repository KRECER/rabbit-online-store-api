const { TelegramClient, Api } = require('telegram');
const { StringSession } = require('telegram/sessions');
const input = require('input'); // npm i input
const { NewMessage } = require('telegram/events');

const apiId = 16863143;
const apiHash = 'eb8f9e49d0f2d6e9e63573b3c5d8bbbb';
const stringSession = new StringSession(
    '1AgAOMTQ5LjE1NC4xNjcuNTEBu6PzFhiOTeZ5ZTeC4WsQnHU4KZf2A5poMAD1en+MgAfMiI2/mQ/0rMVIhhbWlQHG85dblJuUk+sIWAnZK+qwHpdIGjVYUxQnuVLtlGb5+U+If3F9vqpummsArIpXS50H35yp5Cam53iAyY7WNQab2dYfaH7kZLUMYygKZonbqid6X5dAOAFpdJOSmOY7EF28t6TkCfVXchESknhd6g+Uga2Uy/XL92hTc74COOuifweOmO/L4WD6syIzk4od4W1o9SqiR0T3XjSczpPQIC6kG8NC7xALhN9RZHcNzN4IzDEq/wozPWouf11SxTxUxDcgprzId/yaT8vCm3JJ8ENQMMY='
); // fill this later with the value from session.save()

const vladSession = new StringSession(
    '1AgAOMTQ5LjE1NC4xNjcuNTEBu6WGJiL7sUCpTGNfKkR5qbbCZJe0BiSM1i4b372mrDC5cmyN+4IHobn5gFH/laRZIWGrnw5ZknC7tj6uSVLYxaL3olYOlLl7WAaS7+fSVbS87aLxGYXXxfT8bxO4jcWJu220ll+bqEvkUoqM2n2yDFBTuDeIpuHM3uxy7Ax6ZS1CQLiZSCVselUtTAI54YEK6lAbNZrL3KgkVSlFnVsQNmzKe1Smi2MuE59bOHpNBWQsxH51o/uiYJuN23VpPMoz71BPvZcodiZmfammyrGcAnRId4IIIItE2uflDIR6Kteg8drbeEcSBrddE2YsBzHQQslMy14K3MLQVUYDiU7RyAs='
);

const mySession = new StringSession(
    '1AgAOMTQ5LjE1NC4xNjcuNTEBu7UFaG9ah7ku5m6QxQtMgFSv9BMgRhycBadK0wqc9SRF3yF8l1lAKPFrVyJkMUz72itCUdQqoJxKAHqDNoJ0bjNFJ0a1te6k0cToUrQk+CVBDv2fDMHRWKsOPUZazAk4O3aaRIUkPsdlExmVYRbut8YagDR09vtKvb/jPMbuQBLaxwAWhejA010zwnps0mRmo7qAdnpFh7Jxt9fqaxv41bAC80s4ejqRvyAj+0JnXA5dIT7LJ4jpJwnV2F/4EeM7DgAf0BOF6gb5TwGU7pqmJpGImABIuDMpUdHLiqVhRBgwfDeK8/iVnx1vW0Dxc83H6RPD2InwpK8RnX/XTAqtRIs='
);

const session = new StringSession('');

(async () => {
    console.log('Loading interactive example...');
    const client = new TelegramClient(mySession, apiId, apiHash, {
        connectionRetries: 5,
    });
    await client.start({
        phoneNumber: async () => await input.text('number ?'),
        password: async () => await input.text('password?'),
        phoneCode: async () => await input.text('Code ?'),
        onError: (err) => console.log(err),
    });
    async function eventPrint(event) {
        const message = event.message;
        console.log(message);

        // Checks if it's a private message (from user or bot)
        if (event.isPrivate) {
            // prints sender id
            console.log(message.senderId);
            // read message
            if (message.text == 'hello') {
                const sender = await message.getSender();
                console.log('sender is', sender);
                await client.sendMessage(sender, {
                    message: `hi your id is ${message.senderId}`,
                });
            }
        }
    }

    client.addEventHandler(
        eventPrint,
        new NewMessage({ chats: [749029978n, 1616546369n] })
    );
    console.log('Telegram Client now be connected.');
})();
