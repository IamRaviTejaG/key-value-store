import baseCtrl from '../controllers/baseCtrl'
import getCtrl from '../controllers/getCtrl'
import removeCtrl from '../controllers/removeCtrl'
import setCtrl from '../controllers/setCtrl'

const routes = (router) => {
  // Base route
  router.route('/')
    .get(baseCtrl.basePage)

  // Getter routes
  router.route('/get/:key')
    .get(getCtrl.getValue)

  // Setter routes
  router.route('/set/:key/:value')
    .get(setCtrl.setValueString)
  router.route('/set')
    .post(setCtrl.setValueObject)

  // Deletion routes
  router.route('/delete/:key')
    .get(removeCtrl.removeValue)
}

export default routes
