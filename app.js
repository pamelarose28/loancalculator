
// Listen for submit "calculate button"
document.getElementById('loan-form').addEventListener('submit', function(e){
// Hide results
document.getElementById('results').style.display = 'none';
  // Show loader when submit is clicked
document.getElementById('loading').style.display = 'block';

// show loading for 2 seconds - first the function that will happen and then how long in miliseconds

setTimeout(calculateResults, 2000);

  e.preventDefault();
});

// Create function to calculate results
function calculateResults(){
  
  // UI Variables
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');

  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

// Calculations
  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // compute monthly payments

  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal*x*calculatedInterest) / (x-1);

  // find out if monthly number is finite
  if(isFinite(monthly)){
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);

    // Show results
    document.getElementById('results').style.display = 'block';
    
    // Hide loader
    document.getElementById('loading').style.display = 'none';


  } else {
    showError('Please check your numbers');
  }

  
}

// Create error function
function showError(error) {
  // Hide results
  document.getElementById('results').style.display = 'none';
  // Hide loader 
  document.getElementById('loading').style.display = 'none';

  // Create a div
  const errorDiv = document.createElement('div');

  // Get elements (done after create text node and append to div)
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // Add class
  errorDiv.className = 'alert alert-danger';

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  card.insertBefore(errorDiv, heading);
  // Clear error message after 3 sec (done in miliseconds)
  setTimeout(clearError, 3000);

}

function clearError(){
  document.querySelector('.alert').remove();
}
