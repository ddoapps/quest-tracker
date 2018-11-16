# quest-tracker
Source files for https://ddoapps.github.io/questTracker

# Disclaimer

> **Quest Tracker** is a fan site for the <a href="http://www.ddo.com/" target="_new">MMORPG Dungeons &amp; Dragons Online</a><br><br>
> **Quest Tracker** claims no copyright with regard to the information provided within, nor any affiliation with any company holding a copyright of, or related to, the information provided within.  The accuracy, and completeness, of the information provided within is not guaranteed, and by interacting with **Quest Tracker** the user agrees that **Quest Tracker** is not responsible for any negative outcome that may result from using the information provided.<br><br>
> The logo and icon used by **Quest Tracker** was created by David Bupp and is copyright Mark Boyd.  Permission to use has been granted to the applications belonging to the https://ddoapps.github.io domain.

# FAQ (or questions I just thought up)

> Why doesn't my Firefox initialize the application?
1. Verify that you are using a supported version of Firefox
    1. Hit "Alt" to make the menu visible on the top of the browser
    1. Click "Help", followed by "About Firefox"
    1. Your version should be "44" or beyond
        * If your version is prior to this, you will need to update to use this application
1. You may need to enable Service Workers (<a href="https://developers.google.com/web/fundamentals/primers/service-workers/" target="_new">What Are Service Workers?</a>)
    1. Enter "about:config" in your address bar to bring up the browser configuration controls
    1. Search for "dom.serviceWorkers.enabled"
    1. If the value is "false", double click it to toggle it to "true"
        * This should enable Service Workers for you

> Why is my browser (version) not supported?

Supported browsers are those that have been verified to work with the application, and the technologies it uses.  If your browser is not listed, it may still work, however there is not an (on going) effort being made to ensure that this is the case.

> Why does your application use Service Workers?

1. Service Workers allow for the creation of web applications that appear to work on your desktop/mobile device as if they were native applications.  If you can make a web application work like this, you do not have to worry about interacting with any app store or whatever to download the program.  You just visit the site and it is available on your device.
1. Service Workers can make content available while you are offline.  So a user could visit the application, begin creating a new character build, and shut off their internet access.  The application should continue to work.
1. It's a bit of an experiment, I'll admit.  I want to see if I can make an application like this and learn some things in the process.

> Why can I not save my data so I can see them on another device?

The ability to save the data and make it available across devices would require the application to be able to communicate with a website that is capable of storing the data and also retrieving it for later use.  I may implement this logic later on after the application has been pretty well fleshed out.  Or I may make some sort of export functionality where you can copy some save text or something that you can import into the application on another device.  Not entirely sure at this point.  We'll see!

> Can I help you create/update this application?

At the moment I'm not completely up to speed on the ability of git to do pull requests and how that whole architecture works.  For now I'll probably say that if you are interested in helping you could always try to do a pull request, but no guarentees that I won't be an idiot and take a while to figure out how to do that.

In the short term I'll definitely have a thread on the DDO Forums related to this application that people can make comments about, and eventually I may try to figure out how to make GitHub allow Issues to be created for the applciation.