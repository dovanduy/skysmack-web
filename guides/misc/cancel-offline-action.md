# Cancel Offline Action

## Files and purpose
Contains logic on how to update the state depending on what kind of action was cancelled (create/edit/delete)\
`src/app/redux/cancel-offline-action.ts`

\
Options used to configure how the cancel action should work\
`src/framework/redux/types/cancel-offline-action-options.ts`

\
Configures the queue.enqueue() to remove the cancelled action from the offline queue\
`src/framework/redux/redux-offline.configuration.ts`

\
Component with the cancel action button. Needs to receive the cancel action options from a parent component.

Typically this will be the index or base component\
`src/ui/components/switch-cases/switch-cases.component.ts`

\
Contains the method that defines the cancel action method, as well as dispatches it.

Some info is gained from the areas BaseConfig e.g. personsConfig\
`src\framework\redux\base-redux.ts`
