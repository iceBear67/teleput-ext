function testKey() {
  chrome.storage.sync.get('teleputKey', stored => {
    if (!stored || !stored.teleputKey) {
      chrome.runtime.openOptionsPage();
      window.close();
    }
  });
}

async function sendUrlAsync(url, id, key) {
  let desc = document.getElementById('teleput_send_desc').value.trim();
  const params = {
    chat_id: id,
    text: desc ? desc + '\n\n' + url : url
  };
  const options = {
    method: 'POST',
    body: JSON.stringify(params),
    headers: { 'Content-Type': 'application/json' }
  };
  response = await window.fetch('https://api.telegram.org/bot' + key +"/sendMessage", options);
  if (!response.ok)
    document.getElementById('error').innerText = 'Error: ' + response.statusText;
  else
    window.close();
}

function sendUrl() {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    if (tabs) {
      chrome.storage.sync.get('teleputKey', stored => {
        //        console.log(stored)
        if (!stored || !stored.teleputKey) {
          chrome.runtime.openOptionsPage();
          window.close();
        }
        else {
          chrome.storage.sync.get("teleputUserId", storedId => {
            if (!storedId || !storedId.teleputUserId){
              alert("user-id not found")
              chrome.runtime.openOptionsPage();
              window.close();
            }else{
              sendUrlAsync(tabs[0].url, storedId.teleputUserId, stored.teleputKey);
            }
          })
        }
      });
    }
  });
}

document.getElementById('teleput_send_button').addEventListener('click', sendUrl);
document.addEventListener('DOMContentLoaded', testKey);
document.getElementById('teleput_send_desc').focus();
