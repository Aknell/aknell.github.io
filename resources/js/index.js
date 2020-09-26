const $PageTabCollections = Array.from(document.querySelectorAll('.tabs'))

if ($PageTabCollections.length > 0) {
  const getActiveTabFromTabs = tabCollection => () => Array.from(tabCollection).find(tab => tab.classList.contains('is-active'))
  const getActiveTabContentFromList = tabContentCollection => () => Array.from(tabContentCollection).find(content => content.classList.contains('is-active'))
  $PageTabCollections.forEach(tabCollection => {
    const hasUlTabs = tabCollection.children[0].nodeName === 'UL'
    const tabContent = document.getElementById(tabCollection.dataset.contentTarget)
    if (hasUlTabs) {
      const tabs = Array.from(tabCollection.children[0].children)
      const getActiveTab = getActiveTabFromTabs(tabs)
      const getActiveContent = getActiveTabContentFromList(tabContent.children)
      tabs.forEach(tabElm => {
        tabElm.addEventListener('click', () => {
          const activeTab = getActiveTab()
          const activeContent = getActiveContent()
          if (activeContent) {
            activeContent.classList.toggle('is-active')
          }
          if (activeTab) {
            activeTab.classList.toggle('is-active')
          }
          const contentElm = document.getElementById(tabElm.dataset.content)
          if (contentElm) {
            contentElm.classList.toggle('is-active')
          } else {
            console.error('Tab Content not found.')
          }
          tabElm.classList.toggle('is-active')
        })
      })
      const activeTab = getActiveTab()
      const activeContent = document.getElementById(activeTab.dataset.content)
      if (activeContent) {
        if (activeContent.classList.contains('is-active') === false) {
          activeContent.classList.toggle('is-active')
        }
      }
    } else {
      console.error('Error: Tabs found that do not follow Bulma spec')
    }
  })
}
