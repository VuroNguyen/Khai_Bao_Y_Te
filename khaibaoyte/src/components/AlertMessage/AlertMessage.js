import Alert from 'react-bootstrap/Alert'

const AlertMessage = ({ info }) => {
	return info === null ? null : (
		<Alert className="w-75 text-center mx-auto" variant={info.type}>{info.message}</Alert>
	)
}

export default AlertMessage
