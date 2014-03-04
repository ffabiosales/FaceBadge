FaceBadge
=========

Facebook Badge Jquery Plugin. <br />
FaceBadge add a badge of your Facebook Page in your site.

How to use?
----------

Include css style before the tag ``` </head> ```.
```html
<link rel="stylesheet" href="css/faceBadge.css">
```

Add a div where the faceBadge will appear
```html
<div class="some-class"></div>
```

Include Jquery library and plugin call in the footer.
```html
<script src="jquery.js" type="text/javascript"></script>
<script src="jquery.faceBadge.js" type="text/javascript"></script>
```

Below the jquery.faceBadge.js script tag. Add the plugin trigger.

```html
<script>

    $(document).ready(function() {
        $(".some-class").faceBadge({
            pageId: "clubedelutaOficial", //The ID of your paga. aftder facebook.com/
            loaderText: "Creating badge...", //Text to show before load all data.
            width: 350,
            coverHeight: 120, //The height of cover div in the FaceBadge.
            showDesc: false, //Show/Hide some text of your Page.
            linkToPage: true //add a link direct to your Page in the thumbnail.
        });
    });

</script>
```
DEMO
-----

<a href="http://ffabiosales.github.io"> click here </a> to see a working demo. 
