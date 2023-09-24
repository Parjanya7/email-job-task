export const setEmailAmount = async amount => {
  const respose = await fetch(`http://localhost:3100/email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      amount,
    }),
  });
  return await respose.json();
};

export const getSocketData = message => {
  if (!message) {
    return null;
  }

  const match = message.match(/\[.*]/);

  if (!match) {
    return null;
  }
  const parsedMessage = JSON.parse(match);

  if (!Array.isArray(parsedMessage) || !parsedMessage[1]) {
    return null;
  }
  const [, data] = parsedMessage;

  return JSON.parse(data);
};

export const sortDctionary = (jobsDictionary) => (x, y) =>
  jobsDictionary[y].timestamp - jobsDictionary[x].timestamp;
