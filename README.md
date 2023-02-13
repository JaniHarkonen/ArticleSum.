# ArticleSum.

ArticleSum. is a note-taking and data visualization tool designed to summarize and visualize news 
articles in useful ways.

## Development log

### 13.2.2023


### 11.2.2023
Tags-view has been sketched out and tags can now be both created and edited. A tag form modal has 
been implemented to facilitate this. `useFormPopup`-hook has been created to display the FormModal 
for a given `baseInstance` using the exported `popup`-method. The method takes takes in a JSON of 
the popup that is to be displayed by the `Modal`-component found in `App.js`. A `create`-folder 
was added under `modal` (src\modal\create) to store the "creation"-methods for the popup JSONs. 
Additional attributes can be "applied" to the created JSONs via "applier"-methods that have the 
prefix "apply".
<br />
As of now, the `useFormPopup`-hook takes in the key of the title's translation and generates a JSX-
element based on it using the corresponding translation. This way the `LanguageManager` doesn't have 
to be passed onto the creation or applier methods, however, this makes the hook less flexible and 
introduces an inconsistency given that all other elements are passed onto the hook in their function
form (for example `ArticleForm`).
<br />
Finally, the locale packs were slightly restructured, and the `closeModal`-method was added to 
`GlobalContext` to avoid having components call `popup(null)`.
<br />
At the end of this update, a lot of repition remains in the codebase. Next, more focus will be put 
into architecture to resolve similarities between components listed in `TODO.md`.

### 7.2.2023
For this update, the functionality to create new articles and edit existing ones has been added.
The architecture for the modal window has been revamped so that `App.js` now renders modals that 
have been passed onto it via the setState found in `GlobalContext`. Previously `App.js`'s state 
accepted forms that it then rendered whenever the form passed onto it wasn't null. This change 
allows more flexibility as other types of modals can be popped up as well. 
<br />
`EditableText`-component was created. Text enclosed within this component can be edited by the 
user by double-clicking on it. If the user howers their mouse over editable text, its borders 
will be highlighted. The text inside `EditableText`-tags is still suseptible to styles set by 
HTML-tags making the component very versatile.
<br />
`FormModal.js` now utilizes custom hooks in a dynamic manner. The components that wish to 
popup a `FormModal` must now specify which custom hook the modal is to use to pass data and 
hooks to the different components of the modal. This means that the state of `FormModal` is 
completely dynamic allowing the modal to display various forms without a need for new React-
components. The custom hook used by `FormModal` should keep track of the information inside 
the form as well as provide setters to change the information and hooks to submit information.
The custom hook must therefore return `data`, `setters` and `actions` objects to the `FormModal`
that are then subsequently passed onto the appropriate child components (form and footer). This 
change was rather experimental to see if dynamic custom hooks could be utilized by React-
components.
<br />
Finally, a small change was made to the workspace JSON-file. The workspace now keeps track of 
the last unique ID that was generated.
<br />
For the next update, the tag system will be further developed.

### 4.1.2023
TimelineView has been developed to encompass nearly all of its functionalities. The timeline 
properly renders article Markers as well as the timeline itself. The timeline can be panned as well 
as zoomed in and out of with mouse. Moving the mouse over a marker will pop up a preview of the 
article. Pannable view controls can now be included in other components too using the 
`usePannableView`-hook.
<br/>
Pannable views utilize instances of the `DragBox`-class to keep track of the position of the view 
as well as to handle the dragging itself. `DragBox`-instances are handled by the `useDraggables`-
hook which attaches the required mouse event listeners to `document` and determines which elements 
to *grab*, *drag* and *drop*. Event listeners can also be attached `DragBoxes` that trigger whenever 
the `DragBox` is acted upon. The `useDraggables`-hook also returns an array of all the `DragBoxes`
being dragged which can then be used by the implementing React-component.
<br />
Next, the development will focus on the addition, editing and deletion of articles. In the future, 
the `TODO.md` will be used to jot down improvement suggestions to components.

### 30.1.2023
`WorkspaceManager` has now been implemented to hold the model of the currently open workspace in 
memory. Currently the workspace only consists of Articles and Tags, however, a general `Container`
class has been created to provide interface to components of any kind. `Container` wraps a JSON 
containing items (JSONs) arranged by their IDs. The interface provided by `Container` allows the 
addition, modification and removal of items from the wrapped JSON in a way that synchronizes all 
required parties – for example, the workspace that the items are a part of. This makes it to track 
changes to workspace components, and allows the external workspace JSON-file to be updated.
<br />
After careful consideration, a decision has been made to simply load the workspace JSON from an 
external file and store a copy of it in RAM. The JSON is then modified and re-written onto disk 
whenever changes are made. Initially, the idea was to read and write workspaces in a manner that 
allows files of any size to be manipulated. It is, however, very unlikely that the size of any 
workspace will be substantially larger than 1GB making the implementation of line-by-line reading 
and writing via `fs.read`- and `fs.write`-methods needlessly complex. Such an implementation would 
likely be much slower for smaller files, as the items would have to be shifted through using the file 
system and parsed on the fly. Simple reading and writing of JSONs with `fs.readFile`- and 
`fs.writeFile`-methods should suffice, however, the current architecture of the model should allow 
the use of other approaches as well.
<br />
Next, the model will further be integrated with the React-components and missing views will be 
developed further.


### 24.1.2023
LanguageManager-class has now been created and GlobalContext no longer uses a JSON to determine
the language settings of the app. Instead, an instance of the LanguageManager is created to 
manage the currently selected language as well as to handle translations and changing of the 
language. A new `Languages.js` file has also been created. This file is to store the declarations 
of all language packs making it easy to add and remove them. Article schema has also been created, 
however, further thought needs to be put in the final form.
<br />
In the next update the model of ArticleSum. will be developed along with the interplay between the
application and the file system.

### 22.1.2023
The initial, crude versions of ArticleForm and FilterForm have been created, however they are not 
functional yet. A `GlobalContext` has also been created to provide the components with the context 
used throughout the application, including languages and theme. The first iteration of language 
support has also been written, however, consideration still has to be given to changing the 
`locales.js` into a class. This could be done to avoid having to constantly refer to the active 
locale in React-components that wish to use translations. So far, the application is expected to 
only support English and Finnish languages, though the current language solution should – in theory
– support any language. Finally, the view that plainly lists all stored articles has been sketched
out.
<br />
For the next update, the JSON-model for articles will be fleshed out and the existing components 
will be split further.

### 21.1.2023
Initial commit. Basic packages have been installed and Electron has been configured to work 
alongside React. Build settings have also been configured.
