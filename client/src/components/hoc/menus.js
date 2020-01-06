import React from 'react';

function menus(Component){
    return class Menus extends React.Component{
        constructor(props){
            super(props);
            this.setWrapperRef = this.setWrapperRef.bind(this);
            this.handleClickOutside = this.handleClickOutside.bind(this);
        }

        componentDidMount() {
            document.addEventListener('click', this.handleClickOutside);
        }

        componentWillUnmount() {
            document.removeEventListener('click', this.handleClickOutside);
        }

        setWrapperRef(node){
            this.wrapperRef = node;
        }

        handleClickOutside(event){
            console.log(this.wrapperRef.contains(event.target));
            if(this.wrapperRef && !this.wrapperRef.contains(event.target)){
                console.log("why?");
                this.props.onOutsideClick(false);
            }
        }
        render(){
            const props = {
                setWrapperRef: this.setWrapperRef
            };
            return(
                <Component {...props}/>
            )
        }
    }
}

export default menus