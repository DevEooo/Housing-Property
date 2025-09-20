# TODO: Sync Username on Dashboard

## Completed Tasks
- [x] Create UserContext in src/contexts/UserContext.tsx that uses listenToAuthChanges to provide current user data.
- [x] Update src/Dashboard.tsx to wrap dashboard with UserProvider.
- [x] Update src/pages/dashboard/header.tsx to use user data from context for username and avatar.
- [x] Update src/pages/dashboard/avatar-dropdown.tsx to use user data for avatar, name, and email in the modal.

## Followup Steps
- [ ] Test the dashboard after login to ensure the username and avatar are displayed correctly in header and modal.
- [ ] Handle cases where user is not logged in (though dashboard should be protected).
