/*
props: {
title,
dialogTitle,
iconClassName,
tableMenus,
valueListItems,
notRequired: Object,
}
*/

import React from 'react'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Select from 'react-select'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class TableDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      valueListLength: 0,
      valueListItems: [],
      valueSelected: '',
      valueSelectedIndex: '',
      isEditing: false,
      selectNewValue: '',
    }
    this.addItem = this.addItem.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.updateItem = this.updateItem.bind(this)
    this.editOneItem = this.editOneItem.bind(this)
    this.closeDialog = this.closeDialog.bind(this)
  }

  componentWillMount() {
    const { valueListItems } = this.props
    this.setState({
      valueListItems,
      valueListLength: valueListItems.length,
    })
  }

  closeDialog() {
    const { isEditing } = this.state
    if (isEditing) {
      this.setState({
        isEditing: false,
      })
    }
    this.setState({
      dialogOpen: false,
      valueSelected: '',
      valueSelectedIndex: '',
      selectNewValue: '',
    })
  }

  editOneItem(index) {
    const { valueListItems } = this.state
    if (index && valueListItems.length > 0) {
      const data = valueListItems[index[0]]
      this.setState({
        isEditing: true,
        valueSelected: data,
        valueSelectedIndex: index[0],
        dialogOpen: true,
      })
    }
  }

  formValues() {
    const { schemas, tableMenus, showNotification, notRequired } = this.props

    const values = tableMenus.map((item) => {
      const elem = document.querySelector(`[name="${item}"]`)
      return elem ? elem.value : ''
    })
    for (let i = 0; i < values.length; i++) {
      if (!(notRequired && notRequired.index && i === notRequired.index)) {
        if (!values[i]) {
          showNotification('Please complete all fields.')
          return;
        }
      }
    }

    const data = {}
    schemas.forEach((item, index) => {
      data[item] = values[index]
    })

    return data
  }

  addItem() {
    const { fields } = this.props
    let { valueListLength } = this.state
    const { valueListItems } = this.state

    valueListLength += 1

    const data = this.formValues()
    if (!data) return;

    fields.push(data)
    valueListItems.push(data)
    this.setState({
      valueListItems,
      valueListLength,
    })
    this.closeDialog()
  }

  deleteItem() {
    const {
      valueSelectedIndex,
      valueListItems,
    } = this.state

    const { fields } = this.props

    let { valueListLength } = this.state

    valueListLength -= 1
    valueListItems.splice(valueSelectedIndex, 1)
    fields.remove(valueSelectedIndex)

    this.setState({
      valueListItems,
      valueListLength,
    })
    this.closeDialog()
  }

  updateItem() {
    const {
      valueSelectedIndex,
      valueListItems,
    } = this.state

    const { fields } = this.props

    const data = this.formValues()
    if (!data) return;
    valueListItems[valueSelectedIndex] = data

    this.setState({
      valueListItems,
    })

    fields.remove(valueSelectedIndex)
    fields.insert(valueSelectedIndex, data)

    this.closeDialog()
  }

  render() {
    const {
      title,
      iconClassName,
      dialogTitle,
      tableMenus,
      schemas,
      dropdownItem,
    } = this.props

    const {
      isEditing,
      dialogOpen,
      valueListLength,
      valueListItems,
      valueSelected,
      selectNewValue,
    } = this.state

    const fields = (<ul className="fields">
      {
        tableMenus.map((item, index) => {
          const currentValue = valueSelected[schemas[index]]
          if (dropdownItem && dropdownItem.index === index) {
            return (
              <Select
                key={index}
                name={item}
                placeholder={item}
                options={dropdownItem.options}
                value={selectNewValue || currentValue}
                onChange={({ value }) => {
                  if (value) {
                    this.setState({
                      selectNewValue: value,
                    })
                  }
                }}
              />
            )
          }
          return (
            <TextField
              key={index}
              className={(item === 'From' || item === 'To') ? 'inline-elem' : ''}
              floatingLabelText={item}
              type="text"
              name={item}
              defaultValue={isEditing ? currentValue : ''}
            />
          )
        })
      }
    </ul>)

    const actions = isEditing ? [
      <RaisedButton
        className="dialog-button"
        label="Delete"
        default
        onTouchTap={this.deleteItem}
        style={{ float: 'left' }}
      />,
      <RaisedButton
        className="dialog-button"
        label="Cancel"
        default
        onTouchTap={this.closeDialog}
      />,
      <RaisedButton
        className="dialog-button"
        id="update-btn"
        label="Update"
        primary
        onTouchTap={this.updateItem}
      />,
    ] : [
      <RaisedButton
        className="dialog-button"
        label="Cancel"
        default
        onTouchTap={this.closeDialog}
      />,
      <RaisedButton
        className="dialog-button"
        id="add-btn"
        label="Add"
        primary
        onTouchTap={this.addItem}
      />,
    ]

    const modalTitle = isEditing ? `Modify your ${dialogTitle}` : `Add your ${dialogTitle}`

    return (
      <section className="table-dialog">
        <span className="required-icon">*</span>
        <div className="title">
          <h1 className="primary-color">{title}</h1>
          <RaisedButton
            label="Add"
            style={{ verticalAlign: 'middle' }}
            icon={<i style={{ color: '#ffffff', fontSize: 18 }} className={`fa ${iconClassName}`} />}
            primary
            onClick={() => this.setState({ dialogOpen: true })}
          />
          <span className="tooltip" style={{ display: valueListLength ? 'inline-block' : 'none' }}>Click the row to edit.</span>
          <Dialog
            title={modalTitle}
            className="table-dialog-modal"
            actions={actions}
            modal={false}
            open={dialogOpen}
            onRequestClose={this.closeDialog}
            autoScrollBodyContent
          >
            <form id="table-dialog-form">
              { fields }
            </form>
          </Dialog>
        </div>
        <Table style={{ display: valueListLength ? 'table' : 'none' }} onRowSelection={this.editOneItem}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              {
                tableMenus.map((item, index) => (<TableHeaderColumn key={index}>{item}</TableHeaderColumn>))
              }
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} showRowHover>
            {
              valueListItems.map((item, index) => (
                <TableRow key={index} data-index={index} hoverable style={{ cursor: 'pointer' }}>
                  {
                    Object.keys(item).map((innterItem, innerIndex) => <TableRowColumn key={innerIndex}>{item[innterItem]}</TableRowColumn>)
                  }
                </TableRow>
              )
            )
          }
          </TableBody>
        </Table>
      </section>
    )
  }
}

export default TableDialog
