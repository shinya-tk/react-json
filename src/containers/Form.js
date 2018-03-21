import React from 'react'

import FormInput from '../components/FormInput'
import classes from './Form.css'

class Form extends React.Component{
    state = {
        tmpKey: '',
        tmpVal: [],
        savedValue: [],
        inputConfig: {
            inputPropNum: 1,
            str: true,
            obj: false,
            arr: false
        }
    }

    componentWillMount(){
        if(this.state.inputConfig.str){

        }
    }

    handleChangeKey(e){
        this.setState({
            tmpKey: e.target.value
        })
    }

    handleChangeVal(i, e){
        if(this.state.inputConfig.str){
            let _tmpVal = e.target.value
            this.setState({
                tmpVal: _tmpVal
            })
            
        }else if(this.state.inputConfig.obj){

        }else if(this.state.inputConfig.arr){
            let targetInputNum = parseInt(e.target.dataset.inputprop.replace(/inputprop_/g, ''), 10)
            let _tmpVal = this.state.tmpVal.slice()
                _tmpVal[targetInputNum] = e.target.value
            this.setState({
                tmpVal: _tmpVal
            })
        }
    }

    handleClick(e){
        e.preventDefault()
        const _inputConfig = {...this.state.inputConfig, inputPropNum:1}
        const current = {
            [this.state.tmpKey]: this.state.tmpVal
        }
        if( !this.state.tmpKey || !this.state.tmpVal ) return

        if(this.state.inputConfig.str){
            this.setState({
                savedValue: [...this.state.savedValue, current],
                inputConfig: _inputConfig,
                tmpKey: '',
                tmpVal: ''
            })
        }else if(this.state.inputConfig.obj){
            
        }else if(this.state.inputConfig.arr){
            this.setState({
                savedValue: [...this.state.savedValue, current],
                inputConfig: _inputConfig,
                tmpKey: '',
                tmpVal: []
            })
        }

    }

    handleChangeRadio(e){
        let selectedVal = e.target.value
        let _inputConfig;
        let _tmpVal;
// console.log(this.state.tmpVal)
        // let _tmpVal = [...this.state.tmpVal]
// console.log(_tmpVal)
        switch(selectedVal){
            case 'str':
                _inputConfig = {...this.state.inputConfig}
                _inputConfig.str = true
                _inputConfig.obj = false
                _inputConfig.arr = false
                _inputConfig.inputPropNum = 1
// console.log(typeof this.state.tmpVal)
                if(Array.isArray(this.state.tmpVal)){
                    _tmpVal = this.state.tmpVal.slice().toString()
                } else if (typeof this.state.tmpVal === 'string'){
                    _tmpVal = this.state.tmpVal
                } else if ( this.state.tmpVal === null){
                    _tmpVal = ''
                }
                this.setState({
                    inputConfig: _inputConfig,
                    tmpVal: _tmpVal
                })
                break;
            case 'obj':
                _inputConfig.str = false
                _inputConfig.obj = true
                _inputConfig.arr = false
                this.setState({
                    inputConfig: _inputConfig
                })
                break;
            case 'arr':
                _inputConfig = {...this.state.inputConfig}
                _inputConfig.str = false
                _inputConfig.obj = false
                _inputConfig.arr = true

//For below, Str => Arr: ○, Obj => Arr: x
// _tmpVal = this.state.tmpVal.slice()
                if(Array.isArray(this.state.tmpVal)){
                    _tmpVal = []
                    _inputConfig.inputPropNum = 1
                } else if(typeof this.state.tmpVal === 'string'){
                    _tmpVal = this.state.tmpVal.split(',').filter(e => e)
                    this.state.tmpVal.length > 0 ?
                        _inputConfig.inputPropNum = _tmpVal.length
                        :
                        _inputConfig.inputPropNum = 1
                } 
//

                this.setState({
                    inputConfig: _inputConfig,
                    tmpVal: _tmpVal
                })
                break;
            default:
                _inputConfig.str = true
                _inputConfig.obj = false
                _inputConfig.arr = false
                _inputConfig.inputPropNum = 1
                _tmpVal = this.state.tmpVal
                this.setState({
                    inputConfig: _inputConfig,
                    tmpVal: _tmpVal
                })
                break;
        }
    }

    handleClickAddProp(e){
        e.preventDefault()
        if(this.state.inputConfig.str) return
        const _inputConfig = {...this.state.inputConfig}
        _inputConfig.inputPropNum++
        this.setState({
            inputConfig: _inputConfig
        })
    }

    render(){
        return(
            <div className={classes.Container}>
                <FormInput
                    onChangeKey={this.handleChangeKey.bind(this)} 
                    onChangeVal={(i) => this.handleChangeVal.bind(this,i)} 
                    onClick={this.handleClick.bind(this)}
                    onChangeRadio={this.handleChangeRadio.bind(this)}
                    onClickAddProp={this.handleClickAddProp.bind(this)}
                    PropNum={this.state.inputConfig.inputPropNum}
                    PropKey={this.state.tmpKey}
                    PropVal={this.state.tmpVal}
                    isStr={this.state.inputConfig.str}
                    isObj={this.state.inputConfig.obj}
                    isArr={this.state.inputConfig.arr}
                    />
                <div className={classes.OutputCol}>
                    <div className={classes.OutputWrapper}>
                        <pre>
                            {JSON.stringify(this.state.savedValue, null, 2)}
                        </pre>
                    </div>
                    <ul>
                        {/* {console.log(this.state.savedValue)} */}
                        {/* {this.state.savedValue.map((val, i) => {
                            return(
                                <li 
                                    className={classes.Field} key={i}>
                                    {Object.keys(val)}: <span className="val">{val[Object.keys(val)]}</span> */}
                                    {/* onClick={this.edit.bind(this,i)} onKeyDown={this.editArray.bind(this, i)} */}
                                    {/* <span className={classes.Edit}>+</span>
                                    <span onClick={this.removeArray.bind(this, i)} className={classes.Remove}>-</span>
                                </li>
                            )
                        })} */}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Form