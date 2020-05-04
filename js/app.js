function $(value)
{
  return document.getElementById(value);
}


function updateBalance()
{
  let newBalance = +$('curr-budget').innerHTML - +$('curr-expenses').innerHTML;
  $('curr-balance').innerHTML = newBalance;
  if (newBalance >= 0) {
    $('curr-balance').style.color = 'green';
  } else {
    $('curr-balance').style.color = 'red';
  }
}

function addExpenseIcons()
{
  let iconHTML = '<div id="expense-icons"><p><a class="icon"><i class="fas fa-edit"></i></a><a class="icon"><i class="fas fa-trash-alt"></i></a></p></div>'
  $('expense-icons-container').insertAdjacentHTML('beforeend', iconHTML);

  let targetExpenseName = $('expense-name-list').children[$('expense-name-list').children.length-1];
  let targetExpenseAmount = $('expense-amount-list').children[$('expense-amount-list').children.length-1];
  let targetExpenseIcons = $('expense-icons-container').children[$('expense-icons-container').children.length-1];
  let targetEditIcon = targetExpenseIcons.children[0].children[0];
  let targetDeleteIcon = targetExpenseIcons.children[0].children[1];

  console.log(targetExpenseName);
  console.log(targetExpenseAmount);

  targetEditIcon.addEventListener('click', function(){
    $('expense-name-enter').value = targetExpenseName.innerHTML;
    $('expense-amount-enter').value = targetExpenseAmount.innerHTML.replace(/\$|,/g, '');

    let newExpenseTotal = +$('curr-expenses').innerHTML - +targetExpenseAmount.innerHTML.replace(/\$|,/g, '');
    $('curr-expenses').innerHTML = newExpenseTotal;
    updateBalance();

    targetExpenseName.parentNode.removeChild(targetExpenseName);
    targetExpenseAmount.parentNode.removeChild(targetExpenseAmount);
    targetExpenseIcons.parentNode.removeChild(targetExpenseIcons);
  });

  targetDeleteIcon.addEventListener('click', function(){
    let newExpenseTotal = +$('curr-expenses').innerHTML - +targetExpenseAmount.innerHTML.replace(/\$|,/g, '');
    $('curr-expenses').innerHTML = newExpenseTotal;
    updateBalance();

    targetExpenseName.parentNode.removeChild(targetExpenseName);
    targetExpenseAmount.parentNode.removeChild(targetExpenseAmount);
    targetExpenseIcons.parentNode.removeChild(targetExpenseIcons);
  });
}


$('budget-submit').addEventListener('click', function(){
  $('curr-budget').innerHTML = $('budget-enter').value;
  $('budget-enter').value = '';
  updateBalance();
});

$('expense-submit').addEventListener('click', function(){
  let newExpenseName = $('expense-name-enter').value;
  let newExpenseAmount = $('expense-amount-enter').value;

  if (Number.isInteger(+newExpenseAmount) && +newExpenseAmount>0) {
    let newExpenseTotal = +$('curr-expenses').innerHTML + +newExpenseAmount;
    $('curr-expenses').innerHTML = newExpenseTotal;
    updateBalance();

    let newNameHTML = '<p>' + newExpenseName + '</p>';
    let newAmountHTML = '<p>$' + newExpenseAmount + '</p>';
    $('expense-name-list').insertAdjacentHTML('beforeend', newNameHTML);
    $('expense-amount-list').insertAdjacentHTML('beforeend', newAmountHTML);
    addExpenseIcons();
  }

  $('expense-name-enter').value = '';
  $('expense-amount-enter').value = '';
});
