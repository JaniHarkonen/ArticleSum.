### Timeline.js
- separate mouse cursor to another canvas
- separate cursor logic to another useEffect
- make Timeline more general so that it is capable of displaying data other than dates
- remove CAN and DIV
- make Timeline and its subcomponents less dependent on Article

### TagControlPanel.js
- consider refactoring due to similarities with ArticleControlPanel

### createTagForm.js
- consider refactoring due to similarities with craeteArticleForm.js

### ArticleControlPanel.js
- consider refactoring due to similarities with ArticleListing.js with regards to 
popping up the modal

### General
- improve encapsulation by paying attention to dependencies, such as between component and Article
- look to utilize React-fragmens as often as possible
- update `locales`
- restructure `locales`

### App.js
- investigate weird `aria-labelledby="contained-modal-title-vcenter"`; also present in FormModal.js