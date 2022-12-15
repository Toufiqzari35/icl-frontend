import React, { useEffect, useState, useRef, useCallback } from 'react'
import axios from 'axios'

import Entity from './entity'
import Modal from '../../UI/Modal'
import classes from './form.module.css'

// const BASE_URL = process.env.REACT_APP_BASE_URL || 'https://icl.up.railway.app'
const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:8000'

const ViewEntity = (props) => {
  console.log('view-props', props)
  return (
    <ul>
      {Object.entries(props.data).map(([key, value]) => {
        return (
          <li className={classes.li}>
            <div className={classes.key}>{key}</div>
            <div className={classes.value}>{value}</div>
          </li>
        )
      })}
    </ul>
  )
}

const AccountForm = (props) => {
  // initialize references
  const nameRef = useRef()
  const totalCountRef = useRef()

  const formSubmitHandler = (e) => {
    e.preventDefault()
    // POST request to backend and then close the overlay and refresh the accounts
    axios
      .post(BASE_URL + '/api/v1/admin/account/add', {
        name: nameRef.current.value,
        totalCount: totalCountRef.current.value,
      })
      .then((res) => {
        props.onCloseOverlay()
        props.onRefresh()
      })
  }

  return (
    <form className={classes.form} onSubmit={formSubmitHandler}>
      {props.isEdit && props.data && (
        <div className={classes.input}>
          <span>ID</span>
          <span>{props.data._id}</span>
        </div>
      )}
      <div className={classes.input}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          ref={nameRef}
          defaultValue={props.isEdit && props.data.name ? props.data.name : ''}
        />
      </div>
      <div className={classes.input}>
        <label htmlFor="totalCount">TotalCount</label>
        <input
          id="totalCount"
          type="number"
          ref={totalCountRef}
          defaultValue={
            props.isEdit && props.data.totalCount ? props.data.totalCount : ''
          }
        />
      </div>
      <button type="submit">Save</button>
    </form>
  )
}

const TeamForm = (props) => {
  // initialize refrences
  const nameRef = useRef()
  const imageRef = useRef()

  const formSubmitHandler = (e) => {
    e.preventDefault()
    const teamFormData = new FormData()
    teamFormData.append('name', nameRef.current.value)
    teamFormData.append('image', imageRef.current.files[0])

    // POST request to add team
    axios
      .post(BASE_URL + '/api/v1/admin/team/add', teamFormData)
      .then((res) => {
        // close overlay and refresh the teams
        props.onCloseOverlay()
        props.onRefresh()
      })
  }

  return (
    <form className={classes.form} onSubmit={formSubmitHandler}>
      {props.isEdit && props.data && (
        <div className={classes.input}>
          <span>ID</span>
          <span>{props.data._id}</span>
        </div>
      )}
      <div className={classes.input}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          ref={nameRef}
          defaultValue={props.isEdit && props.data.name ? props.data.name : ''}
        />
      </div>
      <div className={classes.input}>
        <label htmlFor="image">Image</label>
        <input id="image" type="file" ref={imageRef} />
      </div>
      <button type="submit">Save</button>
    </form>
  )
}

const PlayerForm = (props) => {
  const nameRef = useRef()
  const employeeIdRef = useRef()
  const accountIdRef = useRef()
  const emailRef = useRef()
  const skillRef = useRef()
  const bioRef = useRef()
  const imageRef = useRef()

  const formSubmitHandler = (e) => {
    e.preventDefault()
    const playerFormData = new FormData()
    playerFormData.append('name', nameRef.current.value)
    playerFormData.append('employeeId', employeeIdRef.current.value)
    playerFormData.append('accountId', accountIdRef.current.value)
    playerFormData.append('email', emailRef.current.value)
    playerFormData.append('skill', skillRef.current.value)
    playerFormData.append('bio', bioRef.current.value)
    playerFormData.append('image', imageRef.current.files[0])

    // POST add player
    axios
      .post(BASE_URL + '/api/v1/admin/player/add', playerFormData)
      .then((res) => {
        // close overlay and refresh players
        props.onCloseOverlay()
        props.onRefresh()
      })
  }

  return (
    <form className={classes.form} onSubmit={formSubmitHandler}>
      {props.isEdit && props.data && (
        <div className={classes.input}>
          <span>ID</span>
          <span>{props.data._id}</span>
        </div>
      )}
      <div className={classes.input}>
        <label htmlFor="accountId">Account</label>
        <select id="accountId" ref={accountIdRef}>
          {props.accounts.map((el) => {
            if (props.isEdit && props.data.accountId === el._id) {
              return (
                <option value={el._id} selected>
                  {el.name}
                </option>
              )
            }
            return <option value={el._id}>{el.name}</option>
          })}
        </select>
      </div>
      <div className={classes.input}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          ref={nameRef}
          defaultValue={props.isEdit && props.data.name ? props.data.name : ''}
        />
      </div>
      <div className={classes.input}>
        <label htmlFor="employeeId">EmployeeId</label>
        <input
          id="employeeId"
          type="number"
          ref={employeeIdRef}
          defaultValue={
            props.isEdit && props.data.employeeId ? props.data.employeeId : ''
          }
        />
      </div>
      <div className={classes.input}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="string"
          ref={emailRef}
          defaultValue={
            props.isEdit && props.data.email ? props.data.email : ''
          }
        />
      </div>
      <div className={classes.input}>
        <label htmlFor="skill">Skill</label>
        <select id="skill" ref={skillRef}>
          {props.skills.map((el) => {
            if (props.isEdit && props.data.skill === el) {
              return (
                <option value={el} selected>
                  {el}
                </option>
              )
            }
            return <option value={el}>{el}</option>
          })}
        </select>
      </div>
      <div className={classes.input}>
        <label htmlFor="bio">Bio</label>
        <input
          id="bio"
          type="text"
          ref={bioRef}
          defaultValue={props.isEdit && props.data.bio ? props.data.bio : ''}
        />
      </div>
      <div className={classes.input}>
        <label htmlFor="image">Image</label>
        <input id="image" type="file" ref={imageRef} />
      </div>
      <button type="submit">Save</button>
    </form>
  )
}

export default function ManageEntities() {
  const [teams, setTeams] = useState([])
  const [players, setPlayers] = useState([])
  const [accounts, setAccounts] = useState([])
  const [modal, setModal] = useState(null)
  const [data, setData] = useState(null)
  const [isEdit, setIsEdit] = useState(false)
  const [isView, setIsView] = useState(false)

  const refreshAccounts = useCallback(() => {
    axios.get(BASE_URL + '/api/v1/account').then((res) => {
      if (res.data.status === 'ok') {
        setAccounts(res.data.accounts)
      }
    })
  }, [])

  const refreshTeams = useCallback(() => {
    axios.get(BASE_URL + '/api/v1/team').then((res) => {
      if (res.data.status === 'ok') {
        setTeams(res.data.teams)
      }
    })
  }, [])

  const refreshPlayers = useCallback(() => {
    axios.get(BASE_URL + '/api/v1/player').then((res) => {
      if (res.data.status === 'ok') {
        setPlayers(res.data.players)
      }
    })
  }, [])

  const viewHandler = (entityName, entityId) => {
    console.log('entityname', entityName)
    console.log('id', entityId)
    const api = `${BASE_URL}/api/v1/${entityName}/${entityId}`
    axios.get(api).then((res) => {
      if (res.data.status === 'ok') {
        setData(res.data[entityName])
        setIsView(true)
      }
    })
  }

  const openModalHandler = (modalType) => {
    setModal(modalType)
    setIsEdit(false)
  }

  const openEditModalHandler = (entityName, entityId) => {
    const api = `${BASE_URL}/api/v1/${entityName}/${entityId}`
    axios.get(api).then((res) => {
      if (res.data.status === 'ok') {
        setData(res.data[entityName])
        setIsEdit(true)
        setModal(entityName)
      }
    })
  }

  const closeModalHandler = () => {
    setModal(null)
    setData(null)
    setIsEdit(false)
    setIsView(false)
  }

  useEffect(() => {
    console.log('-----use-effect----------')
    refreshAccounts()
    refreshTeams()
    refreshPlayers()
  }, [refreshAccounts, refreshTeams, refreshPlayers])

  return (
    <React.Fragment>
      {isView && data && (
        <Modal onCloseOverlay={closeModalHandler}>
          <ViewEntity data={data} />
        </Modal>
      )}
      {modal === 'account' && (
        <Modal onCloseOverlay={closeModalHandler}>
          <AccountForm
            isEdit={isEdit}
            data={data}
            onCloseOverlay={closeModalHandler}
            onRefresh={refreshAccounts}
          />
        </Modal>
      )}
      {modal === 'team' && (
        <Modal onCloseOverlay={closeModalHandler}>
          <TeamForm
            isEdit={isEdit}
            data={data}
            onCloseOverlay={closeModalHandler}
            onRefresh={refreshTeams}
          />
        </Modal>
      )}
      {modal === 'player' && (
        <Modal onCloseOverlay={closeModalHandler}>
          <PlayerForm
            isEdit={isEdit}
            data={data}
            accounts={accounts}
            skills={['Batsman', 'Bowler', 'All Rounder', 'Spinner']}
            onCloseOverlay={closeModalHandler}
            onRefresh={refreshPlayers}
          />
        </Modal>
      )}

      <div style={{ display: 'flex' }}>
        <Entity
          rows={accounts}
          title={'Accounts'}
          boxWidth={50}
          onClickAdd={openModalHandler.bind(null, 'account')}
          onClickEdit={openEditModalHandler.bind(null, 'account')}
          onClickView={viewHandler.bind(null, 'account')}
        />
        <Entity
          rows={teams}
          title={'Teams'}
          boxWidth={50}
          onClickAdd={openModalHandler.bind(null, 'team')}
          onClickEdit={openEditModalHandler.bind(null, 'team')}
          onClickView={viewHandler.bind(null, 'team')}
        />
      </div>
      <Entity
        rows={players}
        title={'Players'}
        boxWidth={100}
        onClickAdd={openModalHandler.bind(null, 'player')}
        onClickEdit={openEditModalHandler.bind(null, 'player')}
        onClickView={viewHandler.bind(null, 'player')}
      />
    </React.Fragment>
  )
}
