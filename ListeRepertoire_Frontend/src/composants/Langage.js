import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
function Langage () {
    const { i18n } = useTranslation()

    useEffect(() => {
        async function tanslate () {
            i18n.changeLanguage('fr')
        }
        tanslate()
    }, [i18n])

    function changerLangue (langue) {
        // alert(langue)
        i18n.changeLanguage(langue)
    }
    return (
        <Row className='mt-3'>
            <Col >
                <Form.Group>
                    <Form.Control as='select' onChange={(e) => { changerLangue(e.target.value) }}>
                        <option value='fr'>Francais</option>
                        <option value='en'>English</option>
                    </Form.Control>
                </Form.Group>
            </Col>
        </Row>
    )
}
export default Langage;

