'use strict';

// Wrap everything in an anonymous function to avoid polluting the global namespace
(function() {
    // Use the jQuery document ready signal to know when everything has been initialized
    $(document).ready(function() {
        // Tell Tableau we'd like to initialize our extension
        tableau.extensions.initializeAsync().then(function() {
            // Once the extension is initialized, ask the user to choose a sheet
            showChooseSheetDialog();
        });
    });

    /**
     * Shows the choose sheet UI. Once a sheet is selected, the data table for the sheet is shown
     */
    function showChooseSheetDialog() {

        // The first step in choosing a sheet will be asking Tableau what sheets are available
        const worksheets = tableau.extensions.dashboardContent.dashboard.worksheets;

        // Next, we loop through all of these worksheets and add buttons for each one
        worksheets.forEach(function(worksheet) {
            
            // Declare our new button which contains the sheet name
            const button = $("<button class='tooltip' slot='hotspot-bad' data-position='0.06789274904367737m 1.9420006412557558m -6.117739169877176m' data-normal='0.9997936950666919m 0.020276126701468552m -0.0012024936077523953m' data-visibility-attribute='visible'></button>");
            
            // Add tooltip to button with worksheet name
            button.html("<span class='tooltiptext'>"+worksheet.name+"</span>");

            // Add our button to the list of worksheets to choose from
            $('#model-viewer').append(button);
        });

    }

})();