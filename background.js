chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  if (details.frameId === 0) { // Only process main frame
    const url = new URL(details.url);
    
    // Check if it's a Google search page
    if (url.hostname === 'www.google.com' && url.pathname === '/search') {
      const params = url.searchParams;
      
      // Only modify if udm parameter doesn't exist or isn't 14
      if (params.get('udm') !== '14') {
        params.set('udm', '14');
        chrome.tabs.update(details.tabId, { url: url.toString() });
      }
    }
  }
});