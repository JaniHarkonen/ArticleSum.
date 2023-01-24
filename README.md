# ArticleSum.

ArticleSum. is a note-taking and data visualization tool designed to summarize and visualize news 
articles in useful ways.

## Development log

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
