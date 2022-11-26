function restoreKey() {
  chrome.storage.sync.get('teleputKey', res => {
    document.getElementById('key').value = res ? res.teleputKey || '' : '';
  })
  chrome.storage.sync.get('teleputUserId', res=>{
    document.getElementById('user-id').value = res ? res.teleputUserId || '' : '';
  })
}

document.addEventListener('DOMContentLoaded', restoreKey);

document.getElementById('keyform').addEventListener('submit', (e) => {
  var props = { 
    teleputKey: document.getElementById('key').value,
    teleputUserId: document.getElementById('user-id').value
  };
  console.log(props)
  chrome.storage.sync.set(props, res => {
    if (chrome.runtime.lastError)
      console.error('Failed to write the key', chrome.runtime.lastError);
  });
  e.preventDefault();
});
