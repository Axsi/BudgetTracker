import React from 'react';
import '../../style/userhub.css';

class UserHub extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            newDescription:'',
            newExpense:'',
            newBudget:0,
            expenses:[],
            mapDate: '',
            budget: 0,
            totalSpending:0
        };
        this.handleLogOut = this.handleLogOut.bind(this);
        this.handleNewExpense = this.handleNewExpense.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleNewBudget = this.handleNewBudget.bind(this);
        this.getExpenses = this.getExpenses.bind(this);
        this.handleExpenseChange = this.handleExpenseChange.bind(this);
        this.getBudget = this.getBudget.bind(this);
        this.accumulateSpending = this.accumulateSpending.bind(this);
    }

    componentDidMount() {
        console.log("YOLO");
        //make a fetch to retrieve all expenses for this user, save it in a array in a state
        this.getExpenses();
        this.getBudget();
    }
    accumulateSpending(expenses){
        let total = 0;
        console.log(expenses);
        for(let i = 0; i < expenses.length; i++){
            total+= parseInt(expenses[i].spending);
        }
        this.setState({
            totalSpending: total
        })
    }
    getBudget(){
        fetch('/getBudget/' + this.props.location.userID)
            .then(response=>response.json())
            .then(data=>{
                console.log("fetch return for /getBudget");
                console.log(data);
                this.setState({
                    budget: parseInt(data.rows[0].budget)
                })
            }).catch(error=>{
                console.log(error);
        })
    }

    handleExpenseChange(event){
        event.preventDefault();
    }
    getExpenses(){
        fetch('/getExpenses/' + this.props.location.userID)
            .then(response=> response.json())
            .then(data=>{
                console.log("fetch return for /getExpense");
                // console.log(data);
                // console.log(data.rows);
                this.accumulateSpending(data.rows);
                this.setState({
                    expenses: data.rows
                })
            }).catch(error=>{
            console.log(error);
        })
    }

    handleLogOut(event){
        event.preventDefault();
    }

    handleNewBudget(event){
        event.preventDefault();
        console.log("Inside handleNewBudget");
        let datetime = new Date();
        let data = {
            userID: this.props.location.userID,
            newBudget: this.state.newBudget,
            time: datetime
        };
        let fetchData = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json;charset=utf-8'}
        };

        fetch('/setBudget', fetchData)
            .then(response=>{
                console.log("fetch return for /setBudget");
                console.log(response);
                this.getBudget();
            }).catch(err=>{
                console.log(err);
        })
    }

    handleUpdate(event){
        event.preventDefault();
        event.persist();
        console.log("Inside handleupdate");
        // console.log(event.target.name);
        let tempDesc = '';
        let tempExp = '';

        if(document.getElementsByName("description"+event.target.name)[0].value === ''){
            tempDesc = document.getElementsByName("description"+event.target.name)[0].placeholder;
        }else{
            tempDesc = document.getElementsByName("description"+event.target.name)[0].value;
        }
        if(document.getElementsByName("spending"+event.target.name)[0].value === ''){
            tempExp = document.getElementsByName("spending"+event.target.name)[0].placeholder;
        }else{
            tempExp = document.getElementsByName("spending"+event.target.name)[0].value;
        }

        let data = {
            expenseID: event.target.name,
            userID: this.props.location.userID,
            description: tempDesc,
            expense: tempExp //if one value is blank then do not update that part
        };
        // console.log(data.description);
        // console.log(data.expense);
        let fetchData = {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json;charset=utf-8'}
        };
        fetch('/updateExpense', fetchData)
            .then(response=>{
                console.log("update complete");
                console.log(response);
                document.getElementsByName("description"+event.target.name)[0].value = '';
                document.getElementsByName("spending"+event.target.name)[0].value = '';
                this.getExpenses();
            }).catch(err=>{
                console.log(err);
        })
    }

    handleDelete(event){
        event.preventDefault();
        console.log("ijnside handleDelete");
        let data = {userID: this.props.location.userID, expenseID: event.target.name};
        let fetchData = {
            method: 'DELETE',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json;charset=utf-8'}
        };
        fetch('/deleteExpense', fetchData)
            .then(response=>{
                console.log("delete complete");
                // console.log(response);
                this.getExpenses();
            }).catch(err=>{
                console.log(err);
        })
    }

    handleNewExpense(event){
        event.preventDefault();
        // console.log("checking for username");
        // console.log(this.props.location.username);
        // console.log(this.props.location.userID);
        let datetime = new Date();
        let data = {
            description: this.state.newDescription, //NEED CURRENT DATE AND ALSO ACCOUNTID!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            expense: this.state.newExpense,
            username:this.props.location.username,
            userID: this.props.location.userID,
            time: datetime
        };
        let fetchData = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json;charset=utf-8'}
        };
        fetch('/addExpense', fetchData)
            .then(response=>{
                // console.log("return handleNewExpense fetch");
                // console.log(response);
                this.getExpenses();
                this.setState({
                    newDescription:'',
                    newExpense:''
                })
            }).catch(error=>{
                console.log('Error: '+ error);
        });
    }
    handleChange(event){
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }
    //if month and year different
    render(){
        return(
            <div id="UserHub-Container">
                <h1 id="UserHub-Title">Welcome {this.props.location.username}</h1>
                <div id="LogOut-Button"></div>
                <div id="AddExpense-Container">
                    <form id="AddExpense-Form">
                    <input id="New-Expense-Description" name="newDescription" placeholder="New Description"
                           onChange={this.handleChange} value={this.state.newDescription}/>
                    <input id="New-Expense" name="newExpense" placeholder="New Expense" onChange={this.handleChange}
                           value={this.state.newExpense}/>
                    <input id="Submit-Expense" type="submit" value="Add Expense" onClick={this.handleNewExpense}/>
                    </form>
                </div>
                <div id="SetBudget-Container">
                    <form id="SetBudget-Form">
                        <input id="New-Budget" name="newBudget" placeholder="New Budget"
                               onChange={this.handleChange} value={this.state.newBudget}/>
                               <input id="Submit-Budget" type="submit" value="Set New Budget" onClick={this.handleNewBudget}/>
                    </form>
                </div>
                <div id="Overview-Container">
                    <div id="Total-Month-Budget">{"Current Budget: "+this.state.budget}</div>
                    <div id="Total-Month-Spending">{"Total Spending: "+this.state.totalSpending}</div>
                    {this.state.budget-this.state.totalSpending > 0 ?
                        <div id="Below">{this.state.budget-this.state.totalSpending}</div>
                        :<div id="Above">{this.state.budget-this.state.totalSpending}</div>}
                </div>
                <div id="Expense-List">
                    {this.state.expenses.length > 0 ? this.state.expenses.map((expense)=>(
                        <form className="Expense" key={expense.expenseid}>
                            <input className="Expense-Description" name={"description"+expense.expenseid} placeholder={expense.description} onChange={this.handleExpenseChange}></input>
                            <input className="Expense-Spending" name={"spending"+expense.expenseid} placeholder={expense.spending} onChange={this.handleExpenseChange}></input>
                            <div className="Expense-Period">{expense.period}</div>
                            <button className="Expense-Update" type="submit" name={expense.expenseid} onClick={this.handleUpdate}>Update</button>
                            <button className="Expense-Delete" type="submit" name={expense.expenseid} onClick={this.handleDelete}>Delete</button>
                        </form>
                    )
                    ):null}
                </div>

            </div>
        )
    }
}

export default UserHub;