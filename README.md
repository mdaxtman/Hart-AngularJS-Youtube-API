# Hart-AngularJS-Youtube-API

## I wrote this app using ui router and bootstrap for some helper classes
#####As it stands, the app mostly works, save for the following:

* Auth is not in place. I got ambitious with setting up a local node server, as well as the gulp tasks and it cost me some time
* The app will take and input and call the youtube api and resolve the http request on state load
* The app does cycle through the playlist in the order of retrieved results but doesn't work when a user clicks on a new video. (This feature was minutes from completion before I ran out of time)
* I have set a $timeout as the youtube player Object was not ready before the directive link function was calling it.

##notes
* you must have a node server running.
* you shouldn't need to compile the js with gulp as it's already compiled as of the commit
* I followed John Papa's angular style guide as best I could in this short amount of time. This also cost me some time, but I feel it's necessary for best practices
