module.exports = function(app){
    app.get("/", function(req, res){
        res.render("index.html", {
            title: "Dynamic title"
        });
    });
    // app.get("/about", function(req, res){
    //     res.render("about.html");
    // });

    app.get("/search", function(req, res){
        res.render("search.html",{
            title: "Search Page"
        });
    });
    
    var CountryName;
    var Year_Data;
    //search-result
    app.post('/search-result', function(req, res){
        CountryName = req.body.country; // Get the value of the "country" parameter from the form submission
        Year_Data = req.body.year; // Get the value of the "year" parameter from the form submission
    
        // Perform the necessary operations with the country and year values
        // For example, you can use the values to perform a database query or fetch data related to the selected country and year.
       let sqlquery = `SELECT 
       C.CountryName, 
       CD.Year_Data, 
       CD.Status_Data,
       CD.Population, 
       CD.HIV_AIDS,
       CD.GDP, 
       CD.BMI,
       CD.Alcohol,
       CD.Schooling, 
       CD.LifeExpectancy_Data
       FROM LifeExpectancy.Country AS C
       JOIN LifeExpectancy.CountryData AS CD ON C.CountryID = CD.CountryID
       WHERE C.CountryName = '${CountryName}' and CD.Year_Data = ${Year_Data};`
       // execute sql query

       db.query(sqlquery, (err, result) => {
       if (err) {
           console.log("Error ececuting the query: ", err);
           res.redirect("/");
       }
       res.render("country-year.html",{SelectedCountryYear: result})
       });

     });
    
};