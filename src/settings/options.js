function saveOptions(e) {
    e.preventDefault();

    browser.storage.local.set({
        theme: document.querySelector('input[name="theme"]:checked').value
    });

}
function restoreOptions() {
    function setCurrentChoice(result) {
        document.querySelector('input[name="theme"][value="'+(result.theme || 'light')+'"]').checked = true;
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    var getting = browser.storage.local.get("theme");
    getting.then(setCurrentChoice, onError);
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelectorAll('input').forEach(element => element.addEventListener('change', saveOptions));