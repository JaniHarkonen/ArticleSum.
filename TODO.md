### Timeline.js
- separate mouse cursor to another canvas
- separate cursor logic to another useEffect
- make Timeline more general so that it is capable of displaying data other than dates
- remove CAN and DIV
- make Timeline and its subcomponents less dependent on Article

### FormModal.js
- move <Modal> to App.js

### ArticleForm.js
- should only take in article information
- should only output article information via hooks
- should have NO DEPENDENCY on Articles

### General
- improve encapsulation by paying attention to dependencies, such as between component and Article
- look to utilize React-fragmens as often as possible

### App.js
- investigate weird `aria-labelledby="contained-modal-title-vcenter"`; also present in FormModal.js