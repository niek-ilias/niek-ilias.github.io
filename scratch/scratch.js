'use strict';

// Wrap everything in an anonymous function to avoid polluting the global namespace
(function() {

    // Use the jQuery document ready signal to know when everything has been initialized
    $(document).ready(function() {

        // Tell Tableau we'd like to initialize our extension
        tableau.extensions.initializeAsync().then(function() {

        // The first step in choosing a sheet will be asking Tableau what sheets are available
        const worksheets = tableau.extensions.dashboardContent.dashboard.worksheets;     

            // Next, we loop through all of these worksheets and add buttons for each one
            worksheets.forEach(function(worksheet) {

                // Declare our new button which contains the sheet name
                const button = $("<button type='button' class='btn btn-default btn-block'></button>");
                button.text(worksheet.name);

                // Add our button to the list of worksheets to choose from
                $('#choose_sheet_buttons').append(button);
                
            });

        });
        
    });

})();