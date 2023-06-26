/**
 * Creates a result-JSON that indicates the type of action
 * that was taken with regards to the contents of the Container
 * as well as the items that were affected by the action.
 * @param {String} action Type of action performed 
 * (Container.ACTION_ADDED, Container.ACTION_MODIFIED,
 * Container.ACTION_REMOVED).
 * @param {Array} affectedItems An array of all the items that
 * were affected by the action.
 * 
 * @returns A JSON representing the action result.
 */
export const Result = (action, affectedItems = []) => {
  return {
    action: action,
    affectedItems: affectedItems
  };
};

/**
 * A wrapper class for a JSON that holds items of a certain type.
 * This wrapper provides methods for modifying the items stored in
 * the container as well as notifying appropriate model components
 * when the changes are made. *Notice* that Containers should not 
 * contain the items they are wrapping. Instead Containers should 
 * function as an interface onto a JSON. 
 * 
 * 
 * Containers are primarily used by the WorkspaceManager to track 
 * changes to different collections of items within the workspace, 
 * such as Articles and Tags.
 */
export default class Container {
  /**
   * One or more items were added.
   */
  static ACTION_ADDED = "added";

  /**
   * One or more items were modified.
   */
  static ACTION_MODIFIED = "modified";

  /**
   * One or more items were removed.
   */
  static ACTION_REMOVED = "removed";

  /**
   * Creates an instance of the Container and assigns a JSON of 
   * items that the Container will provide interface to. A 
   * modification notifier function can also be provided that will 
   * be called once items are changed (by default, no notification 
   * will be made).
   * 
   * The modification notifier function should take a `Result`-type 
   * JSON as input (see Result() for more information) and return 
   * `void`.
   * @param {JSON} wrappedItems JSON containing the items that the 
   * Container will provide interface to.
   * @param {Function} modificationNotifier Lambda-function that the 
   * Container will call each time changes are made to the items.
   */
  constructor(wrappedItems = {}, modificationNotifier = (result) => {}) {
    /**
     * The underlying JSON that the Container provides interface to.
     */
    this.items = wrappedItems;

    /**
     * Function that is triggered each time a change is made to the 
     * underlying JSON.
     */
    this.modificationNotifier = modificationNotifier;

    /**
     * Function that is used to retrieve a new, unique identifier 
     * when adding a new item to the Container. Typically this 
     * function is provided by the owner of the Container. By 
     * default, returns null.
     */
    this.retrieveNewId = () => null;
  }

  /**
   * *TO BE OVERRIDDEN BY CHILD-CLASSES*
   * 
   * This method will resolve the identifier of an item from the 
   * item's JSON. By default, an empty string – "" – will be returned.
   * Classes extending Container should implement their own `resolveId`-
   * method as a means of extracting the item ID.
   * @param {JSON} item The item whose identifier to resolve.
   * 
   * @returns The identifier of the given item.
   */
  resolveId(item) {
    return "";
  }

  /**
   * *TO BE OVERRIDDEN BY CHILD-CLASSES*
   * 
   * Sets the identifier of an item to a given one. When an item with 
   * no identifier is posted via `postItem` a new, unique identifier 
   * is generated and subsequently set using this method.Classes 
   * extending Container should implement their own `setId`-method as 
   * a means of setting the identifier of new items that are to be 
   * added to the Container.
   * 
   * By default, this method returns `null`.
   * @param {JSON} item Item whose identifier should be set.
   * @param {String} id Identifier to set to.
   * 
   * @returns Returns the item if the identifier was set successfully 
   * or `null` if the identifier could not be set.
   */
  setId(item, id) {
    return null;
  }

  /**
   * Posts an item into the Container by either adding it to the 
   * underlying JSON, if it doesn't already exist, or by replacing the 
   * already existing item with the same identifier (ID).
   * 
   * If a `notify`-option is passed inside the optional `options`-JSON, 
   * the triggering of the modification notification function can be 
   * controlled. By default, the notification triggered.
   * @param {JSON} item Item to be added (or modified) to the underlying 
   * JSON.
   * @param {JSON} options *Optional*, post settings that determine 
   * whether the modifications should be notified.
   * 
   * @returns The result of the action (see Result() for more information).
   */
  postItem(item, options = { notify: true }) {
    let action = Container.ACTION_ADDED;
    let itemId = this.resolveId(item);

      // If the item has no ID, retrieve a new, unique ID
      // Otherwise, check an item with the ID already exist and, if so, 
      // modify it
    if( !itemId )
    itemId = this.retrieveNewId();
    else if( this.items[itemId] )
    action = Container.ACTION_MODIFIED;

    this.setId(item, itemId);
    this.items[itemId] = item;

    const result = Result(action, [item]);
    if( options.notify )
    this.modificationNotifier(result);

    return result;
  }

  /**
   * Removes an item from the Container given its identifier (ID).
   * 
   * If a `notify`-option is passed inside the optional `options`-JSON, 
   * the triggering of the modification notification function can be 
   * controlled. By default, the notification triggered.
   * @param {Any} itemId Identifier of the item to be removed.
   * @param {JSON} options *Optional*, post settings that determine 
   * whether the modifications should be notified.
   * 
   * @returns The result of the action (see Result() for more information).
   */
  removeItemById(itemId, options = { notify: true }) {
    const result = Result(Container.ACTION_REMOVED);

      // Item doesn't exist -> return
    if( !this.items[itemId] )
    return result;

    result.affectedItems = [this.items[itemId]];
    delete this.items[itemId];

    if( options.notify )
    this.modificationNotifier(result);

    return result;
  }

  /**
   * Removes a given item from the Container. Functions exactly like 
   * `removeItemById`, however, the identifier (ID) of the item has to be 
   * resolved before removal.
   * 
   * See `Container.removeItemById` for more information.
   * @param {JSON} item JSON of the item to be removed.
   * @param {JSON} options *Optional*, post settings that determine 
   * whether the modifications should be notified.
   * 
   * @returns The result of the action (see Result() for more information).
   */
  removeItem(item, options = { notify: true }) {
    const itemId = this.resolveId(item);
    return this.removeItemById(itemId, options);
  }

  /**
   * Runs a given updater function on all items of the Container. The result 
   * will be a modification (`ACTION_MODIFIED`) of all items changed by the 
   * updater function. 
   * 
   * The updater function should take the item being iterated over as an 
   * input and produce a `Result`-type JSON as an output (see Result() for 
   * more information).
   * 
   * If a `notify`-option is passed inside the optional `options`-JSON, 
   * the triggering of the modification notification function can be 
   * controlled. By default, the notification triggered.
   * @param {Function} updaterFunction A function that will be ran on each 
   * item of the Container.
   * @param {JSON} options *Optional*, post settings that determine 
   * whether the modifications should be notified.
   * 
   * @returns The result of the action (see Result() for more information).
   */
  updateAll(updaterFunction, options = { notify: true }) {
    const result = Result(Container.ACTION_MODIFIED);

    if( !updaterFunction )
    return result;

    for( let key in this.items )
    {
      const item = this.items[key];
      const updaterResult = updaterFunction(item);

        // The updater may affect multiple items -> push each to the result
      for( let i = 0; i < updaterResult.affectedItems.length; i++ )
      result.affectedItems.push(updaterResult.affectedItems[i]);
    }

    if( options.notify )
    this.modificationNotifier(result);

    return result;
  }

  /**
   * Removes all the items from the Container that satisfy a given criteria 
   * provided by the selector function.
   * 
   * The selector function should take the item currently being iterated 
   * over as input and return either `true`, if the item is to be removed, 
   * or `false`, if the item is to remain. By default, all items will be 
   * removed from the Container.
   * 
   * If a `notify`-option is passed inside the optional `options`-JSON, 
   * the triggering of the modification notification function can be 
   * controlled. By default, the notification triggered.
   * @param {Function} selectorFunction Function that determines whether an 
   * item should be removed.
   * @param {JSON} options *Optional*, post settings that determine 
   * whether the modifications should be notified.
   * 
   * @returns The result of the action (see Result() for more information).
   */
  removeMany(selectorFunction = (item) => true, options = { notify: true }) {
    const result = Result(Container.ACTION_REMOVED);

    for( let item in this.items )
    {
      if( selectorFunction(this.items[item]) )
      {
        result.affectedItems.push(this.items[item]);
        delete this.items[item];
      }
    }

    if( options.notify )
    this.modificationNotifier(result);

    return result;
  }

  /**
   * Returns the JSON of an item given its identifier (ID).
   * @param {Any} itemId Identifier (ID) of the item to return.
   * 
   * @returns The item with a given identifier (ID) or `NULL` 
   * if such item does not exist.
   */
  getItem(itemId) {
    return this.items[itemId];
  }

  /**
   * Returns an array of all the items in the Container that satisfy the 
   * given filter function.
   * 
   * The filter function should take the item currently being iterated 
   * over as input and return either `true`, if the item is to be included, 
   * or `false`, if the item is to be excluded. By default, all items will 
   * be included.
   * @param {Function} filterFunction Function that determines whether an 
   * item should be returned.
   * 
   * @returns An array of all items that satisfy the filter function.
   */
  filterItems(filterFunction = (item) => true) {
    const result = [];
    
    for( let item in this.items )
    {
      if( filterFunction(this.items[item]) )
      result.push(this.items[item]);
    }

    return result;
  }

  /**
   * Iterates over the items in the Container and runs a 
   * function on each one. *Notice* that this method should 
   * not modify the attributes of the item that is passed in 
   * to it. 
   * 
   * The mapping function should take the item being iterated 
   * over as input, however, the output can take an arbitrary 
   * form. The results will be placed into an array that is then 
   * returned.
   * 
   * By default, the method will ignore undefined values returned 
   * by the mapping function, however, undefined results can be 
   * included by setting `ignoreUndefined` to `false`.
   * @param {Function} mapFunction A mapping function that will be
   * executed on each item in the Container.
   * @param {Boolean} ignoreUndefined Whether `undefined` mapping 
   * function results should be ignored and *NOT* included in the 
   * array.
   * 
   * @returns An array of the results of the mapping functions.
   */
  mapItems(mapFunction, ignoreUndefined = true) {
    const mapping = [];

    for( let item in this.items )
    {
      const mapResult = mapFunction(this.items[item]);

      if( mapResult !== undefined || !ignoreUndefined )
      mapping.push(mapResult);
    }

    return mapping;
  }

  /**
   * Returns whether an item that satisfies a given condition 
   * exists within the container. The condition is given as a 
   * function that should return true, if the condition is met, 
   * and false, if the condition is not. The iteration will stop 
   * once a satisfactory item is encontered.
   * 
   * @param {Function} condition The condition that is tested 
   * with each item of the container, until a satisfactory item 
   * is encountered.
   * 
   * @returns Whether an item satisfying the condition was found.
   */
  itemExists(condition) {
    for( let item in this.items )
    {
      if( condition(this.items[item]) )
      return true;
    }

    return false;
  }

  /**
   * Sets the function that will be used to retrieve a new, 
   * unique identifier for new items that are to be added to 
   * the Container. 
   * 
   * The function should return a unique identifier.
   * @param {Function} retriever Function that will be called 
   * to get a unique identifier.
   */
  setIdRetriever(retriever) {
    this.retrieveNewId = retriever;
  }

  /**
   * @returns Returns the underlying JSON that the Container 
   * provides interface to.
   */
  getItemArrayReference() {
    return this.items;
  }
}
