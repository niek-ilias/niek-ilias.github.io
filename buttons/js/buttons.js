'use strict';

// Wrap everything in an anonymous function to avoid polluting the global namespace
(function() {

    // Use the jQuery document ready signal to know when everything has been initialized
    $(document).ready(function() {
        // Tell Tableau we'd like to initialize our extension
        tableau.extensions.initializeAsync().then(function() {
            // Once the extension is initialized, ask the user to choose a sheet
            createButtons();

            initializeButtons();

            // Remove all buttons and recreate them based on new sheet
            const worksheet = getSelectedSheet('Hotspot');
            worksheet.addEventListener(tableau.TableauEventType.FilterChanged, function(event){
                document.getElementById("model-viewer").innerHTML = "";
                createButtons();
            });
        });
    });

    // This function gets the worksheet
    function getSelectedSheet(worksheetName) {

        return tableau.extensions.dashboardContent.dashboard.worksheets.find(function(sheet) {
            return sheet.name === worksheetName;
        });
    }
   
     // This function creates a button for each row in the sheet
    function createButtons() {

        // The first step in choosing a sheet will be asking Tableau what sheets are available
        const worksheet = getSelectedSheet('Hotspot');

        // Call to get the selected marks for our sheet
        worksheet.getSummaryDataAsync().then(function(sumdata) {
        // Get the first DataTable for our selected marks (usually there is just one)
        const worksheetData = sumdata.data;

            // For each row in this table we wil now use the columns to populate the buttons
            worksheetData.forEach(function(row) {

                // Declare our new button which contains the data for the selected row
                // The columns in the sheet hotspot must be in the order below
                // Column 0 is the Work Area
                // Column 1 is the Data Position
                // Column 2 is the Data Noraml
                // Column 3 is the Tooltip Text
                // Column 4 is the KPI Color
                // Column 5 is the KPI Number
                const button = $("<button class='workarea' kpi='"+row[4].value
                                +"' slot='hotspot-"+row[0].value
                                +"' data-position='"+row[1].value
                                +"' data-normal='"+row[2].value
                                +"' data-visibility-attribute='invisible'>"+row[5].value
                                +"<div class='tooltiptext'>"+row[3].value
                                +"</div></button>");
    
                // Add our button to the model-viewer 
                $('#model-viewer').append(button);

            });

        });
        
    }

})();