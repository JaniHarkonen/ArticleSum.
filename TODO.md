### Timeline.js
- separate mouse cursor to another canvas
- separate cursor logic to another useEffect
- make Timeline more general so that it is capable of displaying data other than dates
- remove CAN and DIV
- make Timeline and its subcomponents less dependent on Article

- add ability to sort according to "publish date" or "read date"
- add ability to switch intervals (years/months/days)


### TagControlPanel.js
- consider refactoring due to similarities with ArticleControlPanel

### ArticleControlPanel.js
- consider refactoring due to similarities with TagControlPanel.js

### General
- improve encapsulation by paying attention to dependencies, such as between component and Article
- create mappings from Article/Tag JSONs to other objects

### App.js
- investigate weird `aria-labelledby="contained-modal-title-vcenter"`; also present in FormModal.js
