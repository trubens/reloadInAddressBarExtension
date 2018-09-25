'use strict';

/*global chrome:false */

chrome.tabs.onActivated.addListener(function(tab) {
    chrome.pageAction.show(tab.tabId);
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    chrome.pageAction.show(tabId);
    browser.storage.local.get('theme').then(result => {
        const theme = result.theme || 'light';

        const TabStatus = chrome.tabs.TabStatus;
        
        switch(changeInfo.status) {
            case TabStatus.LOADING:
                chrome.pageAction.setIcon({tabId: tabId, path: 'icons/stop-16-'+theme+'.svg'});
                chrome.pageAction.setTitle({tabId, title: 'Stop'});
                break;
            case TabStatus.COMPLETE:
                chrome.pageAction.setIcon({tabId: tabId, path: 'icons/refresh-16-'+theme+'.svg'});
                chrome.pageAction.setTitle({tabId, title: 'Reload page'});
                break;
        }
    });
})

chrome.pageAction.onClicked.addListener(function(aTab) {
    const TabStatus = chrome.tabs.TabStatus;

    switch(aTab.status) {
        case TabStatus.LOADING:
            browser.tabs.executeScript(aTab.id, {
                code: "window.stop();",
                allFrames: true,
                runAt: "document_start"
            });
            break;
        case TabStatus.COMPLETE:
        	chrome.tabs.sendMessage(aTab.id, "riab-testModifiers", function(responseValue) {
				if (responseValue.ctrl) {
					chrome.tabs.duplicate(aTab.id);
				} else if (responseValue.shift) {
					chrome.tabs.reload({bypassCache: true});
				} else {
					chrome.tabs.reload();
                }
        	});
            break;
    }
});

chrome.tabs.query({active: true}, (tab) => chrome.pageAction.show(tab[0].id));
