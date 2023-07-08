# ArticleSum.

ArticleSum. is a note-taking and data visualization tool designed to summarize and visualize news 
articles in useful ways.

## Updates

### 8.7.2023
Version v.1.0.1 fixes some minor bugs as well as a major one where article date filters could not 
be entered into the article filteration form. Some minor improvements were also added.

Changes:
- source links displayed on article listings are now clickable and open up in the browser
- the "Open"-button of article listings was moved to the left side of the link to make the 
placement more consistent
- the "Sort by"-button now displays the default setting which is "none"
- the maximum page size of the "Articles"-tab was changed from 25 to 15 in order to avoid 
excessive scrolling

- bug fixes:
	-- **MAJOR**: date filters on the article filteration form did not work in v.1.0.0 because the 
	use couldn't input a date; this was fixed along with a fatal bug in date filteration functions
	-- MINOR: the overflowing, partially hidden, vertical scroll bar of the timeline has now been
	fixed
	-- MINOR: fixed the overflowing article listings by `break-wording` the links
	-- MINOR: tab-key presses are no longer registered in the article information form unless the 
	focus is specifically on the "Notes"-section

## Development log

### 5.7.2023
The development of ArticleSum. v.1.0.0 has finally come to an end despite a three-month break
earlier. All the functionalities have been completed and the graphical representation has been
finalized. All known bugs were fixed and some last-minute improvements were made (including the 
ability to save a form using `CTRL+S` and the ability to use `TAB` in the article form). The 
result is the best looking Electron application so far (mainly thanks to `Bootstrap.js`).
<br />
<br />
I'm happy with most of the codebase for this project, and I think that I have finally begun to 
fully take advantage of the component-based nature of React by breaking functionalities further 
down into reusable components than in any other project. However, there are still many weird and
perhaps suboptimal aspects to the architecture of the app. One aspect that comes to mind is the 
dynamic usage of hooks in the `FormModal`-component. Looking back, it seems that a better way to 
handle a generic form component would've been to simply wrap the generic component within a more 
specialized wrapper (just like with other components). This would've made the code base much 
clearer as now the dynamic hook is passed into the props of the `ArticleForm` that is created via
the creator function called in the component that is supposed to bring up the modal.
<br />
<br />
Another aspect that makes the code more confusing to read is found in the creator-functions of 
the modal popups. The idea behind these creators was to have a set place in the code base where 
all modal creation functions would be declared and configured to make the code easier to follow.
However, many of the modals use "ordered JSONs" which is a basically a JSON that also contains 
the order in which the fields are to be read. The big issue is that dealing with these JSONs is 
very confusing and even the `createOrderedJson`-utility function is difficult to read, thus 
decreasing code readability.
<br />
<br />
Yet another issue was faced in the development of the tag input field that is used in the article
form as well as the article filteration form. Initially, the idea was to have a single input field 
where the user can enter tag names, choose one from the suggestion drop menu, and have the tag be
added to the input field. The tags were supposed to be displayed as Bootstrap `Badge`-components.
This turned out to be surprisingly difficult as HTML-elements cannot be displayed within input
fields. This meant that the tag input field would have to be changed from an `input` to a `div`
when the focus is off and vice versa when the focus is on the component. Tag badges also couldn't
be displayed as the user was entering the tags making the result glitchy and slightly confusing.
A decision was made to instead have an input field where the user would pick a tag similarly as 
before only the tag would have to be added to the input by clicking a green plus-sign button.

### 27.6.2023
The UI of ArticleSum. has now been finalized along with some bug fixes. `filters.js` was also 
re-written to clarify the codebase as well as to provide a full support for complex queries, 
including compound words, negation and ranged dates. With this update, the functionalities of the 
application are finished.
<br />
<br />
Though `GlobalContext` still has the capacity to provide components with theme-information, the 
implementation of themes will be postponed for now, as it would be a potentially long undertaking.
Another altered functionality was tag input. Initially, `ArticleForm` and `ArticleFilters` both 
allowed the user to type out the desired tags in a row inside a Bootstrap `Form.Control`-element. 
This, however, was very buggy, and a new implementation where the user inputs a tag into a 
control-element and then adds the tag to the inventory was created. Tags can now be removed by 
left-clicking them while holding down CTRL-button.
<br />
<br />
In the next update, the TODO-list will be cleared and remaining bugs will be fixed. Finally, the 
first version – v.1.0.0 – will be released.

### 12.6.2023
The functionalities for creating a new workspace as well as openining an existing one have now 
been added. This required the inclusion of Electron's `dialog`-module, which provides native 
system dialogs that can be displayed, for example, when selecting files. Additionally, 
translations were also added to some of the components that didn't yet have them. Some bugs 
were also fixed and a few new components were created to separate the article sorting 
functionalities from the views using them (namely, TimelineView and ListView). The ability to 
switch themes was not yet added, as it is considered to be closely related to the styling of 
the HTML-elements which is also the subject of the next update.
<br />
<br />
The development of this project is coming to a close, and so, few functionalities will be added 
after this update. Next, the grahpical representation of ArticleSum. will be (almost) finalized 
and the ability to switch themes will be added (unless it is too time consuming).

### 10.6.2023
Created the Word cloud -view with full functionalities. Also some bugfixes were made to other 
views. For example, the removal of tags also results in them being removed from the articles that 
are associated with them. Also the selection functionality present in the ArticleList-component
was abstracted to a custom hook `useSelectables`. The functionality takes on a more abstract form 
so that it can be deployed to any React-component.
<br />
<br />
With this update, most of the core functionalities of ArticleSum. are finished. Next, the ability 
to switch workspaces and, potentially, the theme will be added.

### 19.5.2023
Finalized the functionalities of the Articles- and Tags-view. ArticleList is now more versatile 
and allows the selection of articles using checkboxes whose visibility can be toggled via a prop.
Selection/de-selection controls that are available in the Articles-tab have also been introduced.
Tags can be removed via the "Delete"-button on the Tags-tab.
<br />
<br />
Next, the development will focus on finalizing the functionalities of the Word cloud -tab. After 
this, the GUI of the application will be perfected.

### 12.4.2023
Timeline view has now been completely revamped. The initial design was needlessly elaborate, and 
thus, a simpler way to visualize the timeline has been implemented. The timeline is no longer a 
line consisting of news articles indicated by circles, rather, it is now a chronological ordering 
of articles that have been sorted into "slots" by date. The user can still pan the timeline via 
mouse, however, zooming in and out is no longer possible as it is not necessary given that the 
user can simply jump to a date using the "Goto"-button. A zooming feature may still be implemented 
later on.
<br />
<br />
This update took a very long time partially due to the redesign of the Timeline view as well as its 
architecture, but also due to other projects in the background. In the next update, the Articles- 
and Tags-views will be finalized in terms of features. All other views are to be finalized before 
moving onto the Wordcloud view. There also needs to be controls for the creation and loading of 
workspaces.

### 1.3.2023
In this update, the functionalities of the `FilterForm` on "Articles"-tab were sketched and 
carried out to near completion. So far, the dates have to be manually entered which may be changed 
in later updates. Some special characters can be used to provide more flexibility to the queries, 
such as the quotation mark, "", which allows multiple words to be combined into a single search 
term. Date ranges can also be determined using a dash, -, to denote a range between two dates or 
dates before/after a date, -DATE or DATE-. So far, the filteration is carried out by functions 
declared in `filters.js`. The placement of this file and/or its functions may have to be changed 
later. The filteration functions also contain a fair amount of redundancy among other 
inefficiencies, and thus, their design has to be reassessed in a later update.
<br />
<br />
Two major React-components were also introduced in this update: `TaggedFormControl` and 
`DropdownSearch`. DropdownSearch is a Bootstrap FormControl that can be assigned a word inventory.
When the user types into the FormControl a dropdown menu underneath the input field is populated 
with suggestions based on a given filter criteria. By defaul, the filter matches the input with 
the initial characters of the words in the word inventory. Normally, DropdownSearch doesn't allow 
multiple words to be input, however this functionality can be toggled with a `multiInput`-tag.
<br />
<br />
TaggedFormControl uses the DropdownSearch-component to suggest tags and displays them as 
ArticleTags when the component uses focus. As of now, there is a strange refresh glitch that 
occurs when ENTER is pressed while TaggedFormControl is in focus, however, this needs to be 
investigated further. TaggedFormControls have been integrated to the ArticleForm as well as the 
FilterForm on "Articles"-tab.
<br />
<br />
Finally, slight changes were made to the `EditableText`-component to make it more general with 
regards to its compatibility with parent CSS.
<br />
<br />
Next the development will be focused on finalizing the "Timeline"-tab.

### 15.2.2023
The architecture of components previously listed in `TODO.md` has been somewhat improved to cut 
redundancy. This has been done mostly with the inclusion of JSON-components (functions that only 
return a JSON, de facto creators) that represent the React-component that is to be rendered. 
Various appliers can be used to imbue the JSONs with additional or modified attributes.
<br />
<br />
The modal functionalities of `App.js` were separated into a `useModal`-hook, although it is 
unlikely that other components will utilize it. Finally, the folder structure has been improved 
and organized and language packs have been updated, restructured and LanguageManager has been 
further integrated.
<br />
<br />
Next, filter forms will developed to have their designed functionalities.

### 11.2.2023
Tags-view has been sketched out and tags can now be both created and edited. A tag form modal has 
been implemented to facilitate this. `useFormPopup`-hook has been created to display the FormModal 
for a given `baseInstance` using the exported `popup`-method. The method takes takes in a JSON of 
the popup that is to be displayed by the `Modal`-component found in `App.js`. A `create`-folder 
was added under `modal` (src\modal\create) to store the "creation"-methods for the popup JSONs. 
Additional attributes can be "applied" to the created JSONs via "applier"-methods that have the 
prefix "apply".
<br />
<br />
As of now, the `useFormPopup`-hook takes in the key of the title's translation and generates a JSX-
element based on it using the corresponding translation. This way the `LanguageManager` doesn't have 
to be passed onto the creation or applier methods, however, this makes the hook less flexible and 
introduces an inconsistency given that all other elements are passed onto the hook in their function
form (for example `ArticleForm`).
<br />
<br />
Finally, the locale packs were slightly restructured, and the `closeModal`-method was added to 
`GlobalContext` to avoid having components call `popup(null)`.
<br />
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
<br />
`EditableText`-component was created. Text enclosed within this component can be edited by the 
user by double-clicking on it. If the user howers their mouse over editable text, its borders 
will be highlighted. The text inside `EditableText`-tags is still suseptible to styles set by 
HTML-tags making the component very versatile.
<br />
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
<br />
Finally, a small change was made to the workspace JSON-file. The workspace now keeps track of 
the last unique ID that was generated.
<br />
<br />
For the next update, the tag system will be further developed.

### 4.1.2023
TimelineView has been developed to encompass nearly all of its functionalities. The timeline 
properly renders article Markers as well as the timeline itself. The timeline can be panned as well 
as zoomed in and out of with mouse. Moving the mouse over a marker will pop up a preview of the 
article. Pannable view controls can now be included in other components too using the 
`usePannableView`-hook.
<br/>
<br />
Pannable views utilize instances of the `DragBox`-class to keep track of the position of the view 
as well as to handle the dragging itself. `DragBox`-instances are handled by the `useDraggables`-
hook which attaches the required mouse event listeners to `document` and determines which elements 
to *grab*, *drag* and *drop*. Event listeners can also be attached `DragBoxes` that trigger whenever 
the `DragBox` is acted upon. The `useDraggables`-hook also returns an array of all the `DragBoxes`
being dragged which can then be used by the implementing React-component.
<br />
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
<br />
For the next update, the JSON-model for articles will be fleshed out and the existing components 
will be split further.

### 21.1.2023
Initial commit. Basic packages have been installed and Electron has been configured to work 
alongside React. Build settings have also been configured.
