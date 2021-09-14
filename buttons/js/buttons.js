'use strict';

// Wrap everything in an anonymous function to avoid polluting the global namespace
(function() {

    // Use the jQuery document ready signal to know when everything has been initialized
    $(document).ready(function() {
        // Tell Tableau we'd like to initialize our extension
        tableau.extensions.initializeAsync().then(function() {
            // Once the extension is initialized, ask the user to choose a sheet
            createButtons();

            // Remove all buttons and recreate them based on new sheet
            const worksheet = getSelectedSheet('Hotspot');
            worksheet.addEventListener(tableau.TableauEventType.FilterChanged, function(event){
                document.getElementById("model-viewer").innerHTML = "";
                createButtons();
            });
        });
    });

    
    /**
     * Shows the choose sheet UI. Once a sheet is selected, the data table for the sheet is shown
     */
    function createButtons() {

        // The first step in choosing a sheet will be asking Tableau what sheets are available
        const worksheet = getSelectedSheet('Hotspot');

        // Call to get the selected marks for our sheet
        worksheet.getSummaryDataAsync().then(function(sumdata) {
        // Get the first DataTable for our selected marks (usually there is just one)
        const worksheetData = sumdata.data;

        // For each row in this table we wil now use the columns to populate the buttons
        worksheetData.forEach(function(row) {

            // Declare our new button which contains the selected columns
            const button = $("<button class='workarea' kpi='"+row[4].value+"' slot='hotspot-"+row[0].value+"' data-position='"+row[1].value+"' data-normal='"+row[2].value+"' data-visibility-attribute='invisible'><div class='tooltiptext'>"+row[3].value+"</div></button>");
  
            // Add our button to the model-viewer
            $('#model-viewer').append(button);

        });

             });
        
    }

    function getSelectedSheet(worksheetName) {
        // Go through all the worksheets in the dashboard and find the one we want
        return tableau.extensions.dashboardContent.dashboard.worksheets.find(function(sheet) {
            return sheet.name === worksheetName;
        });
    }

})();