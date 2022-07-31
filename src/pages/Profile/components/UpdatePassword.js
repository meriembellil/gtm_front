import React, { useEffect, useState } from 'react'
import { TabPane, FormGroup, Button } from 'reactstrap'
import { AvForm, AvField } from "availity-reactstrap-validation"
import { updatePwd } from 'store/user/services';
import bcrypt from "bcryptjs"
import ErrorAlert from 'shared/ErrorAlert';
import SuccessAlert from 'shared/SuccessAlert';
import { useDispatch } from 'react-redux';
import { getUserProfile } from 'store/user/actions';

export default function UpdatePassword(props) {

    const { user, setUser } = props
    const dispatch = useDispatch()
    const [password, setpassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [newPassword, setNewPassword] = useState(null)
    const [newUser, setNewUser] = useState({})
    const [successMessage, setSuccessMessage] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)

    const updatePassword = async () => {

        await updatePwd(newUser).then(async () => {
            const res = dispatch(await getUserProfile(user.username))
            setUser(res.payload.user.data)
            setSuccessMessage("password updated successfully")
            setTimeout(() => { setSuccessMessage(false) }, 3000);
        }).catch((err) => {
            setErrorMessage(err.response.data.message)
            setTimeout(() => { setErrorMessage(false) }, 3000);
        })
    }

    useEffect(() => {
        if (password === confirmPassword && newPassword) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    setNewUser({
                        ...newUser,
                        id: user.id,
                        password: password,
                        newPassword: bcrypt.hashSync(newPassword, 12)
                    })
                } 
            });
        }
    }, [confirmPassword, password, newPassword])

    return (
        <TabPane tabId={2}>
            <AvForm
                onValidSubmit={() => {
                    updatePassword()
                }}
            >
                <AvField
                    className="mb-3"
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    errorMessage="Enter password"
                    validate={{ required: { value: true } }}
                    value={password}
                    onChange={(e) => { setpassword(e.target.value) }}
                />
                <AvField
                    className="mb-3"
                    label="Confirm password"
                    name="password1"
                    type="password"
                    placeholder="Re-type password"
                    errorMessage="Re-enter password"
                    validate={{
                        required: { value: true },
                        match: { value: "password" },
                    }}
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value) }}
                />
                <AvField
                    className="mb-3"
                    label="New password"
                    name="newpassword"
                    type="password"
                    placeholder="New password"
                    errorMessage="Enter your password"
                    validate={{ required: { value: true }, }}
                    value={newPassword}
                    onChange={(e) => { setNewPassword(e.target.value) }}
                />
                {errorMessage &&
                    <ErrorAlert errorMessage={errorMessage} />
                }
                {successMessage &&
                    <SuccessAlert successMessage={successMessage} />
                }
                <FormGroup className="mb-0" style={{ float: 'right' }}>
                    <div>
                        <Button
                            type="submit"
                            color="primary"
                            className="ms-1"
                        >
                            Update password
                        </Button>
                    </div>
                </FormGroup>
            </AvForm>
        </TabPane>
    )
}