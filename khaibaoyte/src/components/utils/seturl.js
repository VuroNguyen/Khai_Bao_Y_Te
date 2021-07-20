import jwt_decode from 'jwt-decode';

const today = new Date();

const checkToken = (token , name) => {
    if (token == null || token === '') {
        return `/`
    }
    else if (jwt_decode(token).exp * 1000 < today.getTime()) {
        return `/`
    }
    else switch (name) {
        case 'report': {
            return `/report/${token}`;
            break;
        }
        case 'enterprise': {
            return `/enterprise/${token}`;
            break;
        }
        case 'admindashboard': {
            return `/admindashboard/${token}`;
            break;
        }
        case 'history': {
            return `/history/${token}`;
        }
        case 'form': {
            return `/form/${token}`;
        }

    }
}

export default checkToken;
