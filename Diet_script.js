
document.getElementById("dietForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    var age = parseInt(document.getElementById("age").value);
    var weight = parseFloat(document.getElementById("weight").value);
    var height = parseFloat(document.getElementById("height").value);
    var gender = document.getElementById("gender").value;
    var goal = document.getElementById("goal").value;
    var activityLevel = parseFloat(document.getElementById("activity").value);
    
    
    var bmr;
    
    // Calculate BMR based on age, weight, height, gender, and activity level
    if (gender === "male") {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else if (gender === "female") {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    
    // Adjust BMR based on activity level
    if (activityLevel === "sedentary") {
        bmr *= 1.2;
    } else if (activityLevel === "lightlyActive") {
        bmr *= 1.375;
    } else if (activityLevel === "moderatelyActive") {
        bmr *= 1.55;
    } else if (activityLevel === "veryActive") {
        bmr *= 1.725;
    } else if (activityLevel === "extraActive") {
        bmr *= 1.9;
    }
    
    // Adjust BMR based on goal
    if (goal === "lose") {
        bmr *= 0.8; // Reduce calorie intake by 20% for weight loss
    } else if (goal === "gain") {
        bmr *= 1.2; // Increase calorie intake by 20% for weight gain
    }
    
    // Calculate daily calorie intake
    var calorieIntake = Math.round(bmr);
    
    // Display calorie intake
    document.getElementById("calories").innerHTML = "Your daily calorie intake: " + calorieIntake + " calories";
    
    // Generate meal plan
    var mealPlan = generateMealPlan(calorieIntake);
    
    // Display meal plan
    var mealPlanList = document.getElementById("mealPlan");
    mealPlanList.innerHTML = ""; // Clear previous results
    mealPlan.forEach(function(item) {
        var listItem = document.createElement("li");
        listItem.textContent = item;
        mealPlanList.appendChild(listItem);
    });
    
    document.getElementById("recalculate").addEventListener("click", function(event) {
        clearInputs();
        clearResults();
    });
    
    document.getElementById("exportPDF").addEventListener("click",function(event){
        exportAsPDF();
    });

    function clearInputs(){
        document.getElementById("age").value="";
        document.getElementById("weight").value="";
        document.getElementById("height").value="";
        document.getElementById("gender").selectedIndex=0;
        document.getElementById("goal").selectedIndex=0;
        document.getElementById("activity").selectedIndex=0;
    }

    function exportAsPDF() {
        const mealPlanContent = document.getElementById("mealPlan");
    
        // Apply custom styles to the meal plan content
        mealPlanContent.querySelectorAll("li").forEach(item => {
            item.style.padding = "10px";
            item.style.borderBottom = "1px solid #ddd";
            item.style.backgroundColor = "#f9f9f9";
            item.style.fontFamily = "Arial, sans-serif";
            item.style.fontSize = "14px";
            item.style.color = "#333";
        });
    
        // Generate PDF
        html2pdf()
            .from(mealPlanContent)
            .set({
                margin: 20,
                filename: 'meal_plan.pdf',
                html2canvas: { scale: 2 },
                jsPDF: { format: 'a4', orientation: 'portrait' }
            })
            .save();
    }

    function clearResults() {
        document.getElementById("calories").textContent = "";
        document.getElementById("protein").textContent = "";
        document.getElementById("carbs").textContent = "";
        document.getElementById("mealPlan").innerHTML = "";
        document.getElementById("result").style.display = "none";
    }

    // Calculate macronutrients
    var protein = Math.round(weight * 0.8); // 0.8 grams of protein per kg of body weight
    var carbs = Math.round(calorieIntake * 0.5 / 4); // 50% of calories from carbs, assuming 4 calories per gram
    
    // Display macronutrients
    document.getElementById("protein").textContent = protein + " g";
    document.getElementById("carbs").textContent = carbs + " g";
    
    // Show the result section
    document.getElementById("result").style.display = "block";
});

function generateMealPlan(calories) {
    var breakfast = "Oatmeal with fruit";
    var lunch = "Grilled chicken salad";
    var dinner = "Salmon with quinoa and vegetables";
    
    // You can customize meal plans based on calorie intake
    if (calories < 1500) {
        breakfast = "Yogurt with granola";
        lunch = "Turkey sandwich with whole wheat bread";
        dinner = "Stir-fried tofu with brown rice";
    } else if (calories < 2000) {
        breakfast = "Avocado toast with eggs";
        lunch = "Quinoa salad with chickpeas";
        dinner = "Pasta primavera with marinara sauce";
    }
    
    return [breakfast, lunch, dinner];
}


/*

document.getElementById("dietForm").addEventListener("calculate", function(event) {
    event.preventDefault();
    
    var age = parseInt(document.getElementById("age").value);
    var weight = parseFloat(document.getElementById("weight").value);
    var height = parseFloat(document.getElementById("height").value);
    var gender = document.getElementById("gender").value;
    var goal = document.getElementById("goal").value;
    var activityLevel = parseFloat(document.getElementById("activity").value);
    
    if (isNaN(age) || isNaN(weight) || isNaN(height) || !gender || isNaN(activityLevel)) {
        alert('Please enter valid inputs for age, weight, height, gender, and activity level.');
        return;
    }
    
    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr;
    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else if (gender === 'female') {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    
    // Adjust BMR based on activity level
    bmr *= activityLevel;
    
    // Adjust BMR based on goal
    if (goal === "lose") {
        bmr *= 0.8; // Reduce calorie intake by 20% for weight loss
    } else if (goal === "gain") {
        bmr *= 1.2; // Increase calorie intake by 20% for weight gain
    }
    
    // Calculate daily calorie intake
    var calorieIntake = Math.round(bmr);
    
    // Display calorie intake
    document.getElementById("calories").innerHTML = "Your daily calorie intake: " + calorieIntake + " calories";
    
    // Generate meal plan
    var mealPlan = generateMealPlan(calorieIntake);
    
    // Display meal plan
    var mealPlanList = document.getElementById("mealPlan");
    mealPlanList.innerHTML = ""; // Clear previous results
    mealPlan.forEach(function(item) {
        var listItem = document.createElement("li");
        listItem.textContent = item.name + ": " + item.calories + " calories";
        mealPlanList.appendChild(listItem);
    });
    
    document.getElementById("recalculate").addEventListener("click", function(event) {
        clearInputs();
        clearResults();
    });
    
    document.getElementById("exportPDF").addEventListener("click", function(event) {
        exportAsPDF();
    });

    function clearInputs() {
        document.getElementById("age").value = "";
        document.getElementById("weight").value = "";
        document.getElementById("height").value = "";
        document.getElementById("gender").selectedIndex = 0;
        document.getElementById("goal").selectedIndex = 0;
        document.getElementById("activity").selectedIndex = 0;
    }

    function exportAsPDF() {
        const mealPlanContent = document.getElementById("mealPlan");
    
        // Apply custom styles to the meal plan content
        mealPlanContent.querySelectorAll("li").forEach(item => {
            item.style.padding = "10px";
            item.style.borderBottom = "1px solid #ddd";
            item.style.backgroundColor = "#f9f9f9";
            item.style.fontFamily = "Arial, sans-serif";
            item.style.fontSize = "14px";
            item.style.color = "#333";
        });
    
        // Generate PDF
        html2pdf()
            .from(mealPlanContent)
            .set({
                margin: 20,
                filename: 'meal_plan.pdf',
                html2canvas: { scale: 2 },
                jsPDF: { format: 'a4', orientation: 'portrait' }
            })
            .save();
    }

    function clearResults() {
        document.getElementById("calories").textContent = "";
        document.getElementById("protein").textContent = "";
        document.getElementById("carbs").textContent = "";
        document.getElementById("mealPlan").innerHTML = "";
        document.getElementById("result").style.display = "none";
    }

    // Calculate macronutrients
    var protein = Math.round(weight * 0.8); // 0.8 grams of protein per kg of body weight
    var carbs = Math.round(calorieIntake * 0.5 / 4); // 50% of calories from carbs, assuming 4 calories per gram
    
    // Display macronutrients
    document.getElementById("protein").textContent = protein + " g";
    document.getElementById("carbs").textContent = carbs + " g";
    
    // Show the result section
    document.getElementById("result").style.display = "block";
});

function generateMealPlan(calories) {
    const meals = [
        { name: 'Breakfast', items: ['Oatmeal with fruit', 'Eggs', 'Banana'], calories: 450 },
        { name: 'Lunch', items: ['Grilled chicken salad', 'Rice', 'Greek Salad'], calories: 600 },
        { name: 'Dinner', items: ['Salmon with quinoa and vegetables', 'Steak', 'Strawberries'], calories: 800 },
        { name: 'Snack', items: ['Protein Shake', 'Apple'], calories: 350 }
    ];

    let totalCalories = 0;
    let mealPlan = meals.map(meal => {
        totalCalories += meal.calories;
        return {
            name: meal.name,
            calories: meal.calories
        };
    });

    // Customize meals based on calorie intake
    if (calories < 1500) {
        mealPlan = [
            { name: 'Breakfast', calories: 300 },
            { name: 'Lunch', calories: 400 },
            { name: 'Dinner', calories: 500 },
            { name: 'Snack', calories: 200 }
        ];
    } else if (calories < 2000) {
        mealPlan = [
            { name: 'Breakfast', calories: 400 },
            { name: 'Lunch', calories: 500 },
            { name: 'Dinner', calories: 700 },
            { name: 'Snack', calories: 300 }
        ];
    }

    return mealPlan;
}



    document.getElementById("dietForm").addEventListener("submit", function(event) {
        event.preventDefault();
        
        
        var age = parseInt(document.getElementById("age").value);
        var height =parseInt(document.getElementById("height").value);
        var weight = parseInt(document.getElementById("weight").value);
        var gender = parseInt(document.getElementById("gender").value);
        var goal = document.getElementById("goal").value;
        var activityLevel = document.getElementById("activity").value;
        
        var bmr;
        
        // Calculate BMR based on age, weight, and activity level
        if(gender === "male"){
            if (activityLevel ==="sedentary"){
                bmr = (10 * weight + 6.25* height -5*age)*1.2
            }
            else if(activityLevel ==="lightlyActive"){
                bmr = (10 * weight + 6.25* height -5 * age)*1.375
            }
            else if(activityLevel ==="moderatelyActive"){
                bmr = (10 * weight +6.25* height -5 * age)*1.55
            }
            else if(activityLevel ==="veryActive"){
                bmr = (10 * weight +6.25* height -5 * age)*1.725
            }
            else if(activityLevel ==="extraActive"){
                bmr = (10 * weight +6.25* height -5 * age)*1.9
            }

        else if (gender === "female"){        
            if (activityLevel ==="sedentary"){
                bmr = (10 * weight + 6.25* height -5*age)*1.2 - 161
            }
            else if(activityLevel ==="lightlyActive"){
                bmr = (10 * weight + 6.25* height -5*age)*1.375 - 161
            }
            else if(activityLevel ==="moderatelyActive"){
                bmr = (10 * weight +6.25* height -5*age)*1.55 - 161
            }
            else if(activityLevel ==="veryActive"){
                bmr = (10 * weight +6.25* height -5*age)*1.725 -161
            }
            else if(activityLevel ==="extraActive"){
                bmr = (10 * weight +6.25* height -5*age)*1.9 -161
            }
        }
            
        
        // Adjust BMR based on goal
        if (goal === "lose") {
            bmr *= 0.8; // Reduce calorie intake by 20% for weight loss
        } else if (goal === "gain") {
            bmr *= 1.2; // Increase calorie intake by 20% for weight gain
        }
        
         
        // Display calorie intake
        document.getElementById("calories").innerHTML = "Your daily calorie intake: " + bmr + " calories";
        
        // Generate meal plan
        var mealPlan = generateMealPlan(bmr);
        
        // Display meal plan
        var mealPlanList = document.getElementById("mealPlan");
        mealPlanList.innerHTML = ""; // Clear previous results
        mealPlan.forEach(function(item) {
            var listItem = document.createElement("li");
            listItem.textContent = item;
            mealPlanList.appendChild(listItem);
        });
        
        document.getElementById("recalculate").addEventListener("click", function(event) {
            clearInputs();
            clearResults();
        });
        
        document.getElementById("exportPDF").addEventListener("click",function(event){
            exportAsPDF();
        });

        function clearInputs(){
            document.getElementById("age").value="";
            document.getElementById("height").value="";
            document.getElementById("weight").value="";
            document.getElementById("gender").selectedIndex=0;
            document.getElementById("goal").selectedIndex=0;
            document.getElementById("activity").selectedIndex=0;
        }

        function exportAsPDF() {
            const mealPlanContent = document.getElementById("mealPlan");
        
            // Apply custom styles to the meal plan content
            mealPlanContent.querySelectorAll("li").forEach(item => {
                item.style.padding = "10px";
                item.style.borderBottom = "1px solid #ddd";
                item.style.backgroundColor = "#f9f9f9";
                item.style.fontFamily = "Arial, sans-serif";
                item.style.fontSize = "14px";
                item.style.color = "#333";
            });
        
            // Generate PDF
            html2pdf()
                .from(mealPlanContent)
                .set({
                    margin: 20,
                    filename: 'meal_plan.pdf',
                    html2canvas: { scale: 2 },
                    jsPDF: { format: 'a4', orientation: 'portrait' }
                })
                .save();
        }

        function clearResults() {
            document.getElementById("calories").textContent = "";
            document.getElementById("protein").textContent = "";
            document.getElementById("carbs").textContent = "";
            document.getElementById("mealPlan").innerHTML = "";
            document.getElementById("result").style.display = "none";
        }
        

        // Calculate macronutrients
        var protein = Math.round(weight * 0.8); // 0.8 grams of protein per kg of body weight
        var carbs = Math.round(calorieIntake * 0.5 / 4); // 50% of calories from carbs, assuming 4 calories per gram
        
        // Display macronutrients
        document.getElementById("protein").textContent = protein + " g";
        document.getElementById("carbs").textContent = carbs + " g";
        
        // Show the result section
        document.getElementById("result").style.display = "block";
    };
    
    function generateMealPlan(bmr) {
        var breakfast = "Oatmeal with fruit";
        var lunch = "Grilled chicken salad";
        var dinner = "Salmon with quinoa and vegetables";
        
        // You can customize meal plans based on calorie intake
        if (bmr < 1500) {
            breakfast = "Yogurt with granola";
            lunch = "Turkey sandwich with whole wheat bread";
            dinner = "Stir-fried tofu with brown rice";
        } else if (bmr < 2000) {
            breakfast = "Avocado toast with eggs";
            lunch = "Quinoa salad with chickpeas";
            dinner = "Pasta primavera with marinara sauce";
        }
        
        return [breakfast, lunch, dinner];
    }
})
*/