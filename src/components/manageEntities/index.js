import React, { useEffect, useState, useRef, useCallback } from 'react'
import axios from 'axios'

import Entity from './entity'
import Modal from '../../UI/Modal'
import classes from './form.module.css'

// constants
const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:8000'

const ViewEntity = (props) => {
  return (
    <React.Fragment>
      <ul>
        {Object.entries(props.data).map(([key, value]) => {
          return (
            <li className={classes.li}>
              <div className={classes.key}>{key}</div>
              <div className={classes.value}>{JSON.stringify(value)}</div>
            </li>
          )
        })}
      </ul>
      {props.data.imageUrl && (
        <img
          src={`${BASE_URL}/${props.data.imageUrl}`}
          style={{ width: '50%', marginLeft: '20%' }}
        />
      )}
    </React.Fragment>
  )
}

const AccountForm = (props) => {
  // initialize references
  const nameRef = useRef()
  const totalCountRef = useRef()

  const formSubmitHandler = (e) => {
    e.preventDefault()
    const payload = {
      name: nameRef.current.value,
      totalCount: totalCountRef.current.value,
    }
    if (props.isEdit) payload.accountId = props.data._id

    // POST request to backend and then close the overlay and refresh the accounts
    const api =
      BASE_URL +
      (props.isEdit
        ? '/api/v1/admin/account/edit'
        : '/api/v1/admin/account/add')
    console.log('api', api)
    console.log('PAYLOAD', payload)
    axios.post(api, payload).then((res) => {
      console.log('res', res.data)
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
    if (props.isEdit) teamFormData.append('teamId', props.data._id)

    // POST request to add team
    const api =
      BASE_URL +
      (props.isEdit ? '/api/v1/admin/team/edit' : '/api/v1/admin/team/add')
    axios.post(api, teamFormData).then((res) => {
      console.log('res', res.data)
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
    if (props.isEdit) playerFormData.append('playerId', props.data._id)

    // POST add player
    const api =
      BASE_URL +
      (props.isEdit ? '/api/v1/admin/player/edit' : '/api/v1/admin/player/add')
    axios.post(api, playerFormData).then((res) => {
      console.log('res', res.data)
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
          {props.accounts.map((account) => (
            <option
              value={account._id}
              selected={
                props.isEdit &&
                props.data.accountId &&
                account._id === props.data.accountId
              }
            >
              {account.name}
            </option>
          ))}
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
          {props.skills.map((skill) => (
            <option
              value={skill}
              selected={
                props.isEdit && props.data.skill && skill === props.data.skill
              }
            >
              {skill}
            </option>
          ))}
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
        setTeams(
          res.data.teams.map((team) => ({
            ...team,
            teamOwnerName: team.teamOwner ? team.teamOwner.playerId.name : '',
          }))
        )
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

  const deleteHandler = (entityName, entityId) => {
    const api = `${BASE_URL}/api/v1/admin/${entityName}/${entityId}`
    axios.delete(api).then((res) => {
      console.log('DELETE - res', res.data)
      if (res.data.status === 'ok') {
        switch (entityName) {
          case 'account':
            refreshAccounts()
            break
          case 'player':
            refreshPlayers()
            break
          case 'team':
            refreshTeams()
          default:
            console.log('unknown entity name')
        }
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
      {/* show modals */}
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

      {/* show entities */}
      <div style={{ display: 'flex' }}>
        <Entity
          rows={accounts}
          title={'Accounts'}
          boxWidth={50}
          onClickAdd={openModalHandler.bind(null, 'account')}
          onClickEdit={openEditModalHandler.bind(null, 'account')}
          onClickView={viewHandler.bind(null, 'account')}
          onClickDelete={deleteHandler.bind(null, 'account')}
        />
        <Entity
          rows={players}
          title={'Players'}
          boxWidth={50}
          onClickAdd={openModalHandler.bind(null, 'player')}
          onClickEdit={openEditModalHandler.bind(null, 'player')}
          onClickView={viewHandler.bind(null, 'player')}
          onClickDelete={deleteHandler.bind(null, 'player')}
        />
      </div>
      <div style={{ display: 'flex' }}>
        <Entity
          rows={teams}
          title={'Teams'}
          boxWidth={70}
          onClickAdd={openModalHandler.bind(null, 'team')}
          onClickEdit={openEditModalHandler.bind(null, 'team')}
          onClickView={viewHandler.bind(null, 'team')}
          onClickDelete={deleteHandler.bind(null, 'team')}
          additionalColums={['teamOwnerName']}
        />
        <div style={{ margin: 'auto' }}>
          <button>Set Team Owner</button>
        </div>
      </div>
    </React.Fragment>
  )
}
