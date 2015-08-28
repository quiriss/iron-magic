import UnityStandardAssets;
import UnityStandardAssets.CrossPlatformInput;

//Allows to steer plane in up and down direction and accelerate and brake
public class AeroplaneUserControl2AxisUScript extends MonoBehaviour
    {
        // these max angles are only used on mobile, due to the way pitch and roll input are handled
        var  maxRollAngle: float = 80;
        var  maxPitchAngle: float = 80;

        // reference to the aeroplane that we're controlling
       private var m_Aeroplane: AeroplaneControllerUScript;
        private var  m_Throttle:float;
        private var m_AirBrakes: boolean;
        private var m_Yaw: float;


        function  Awake()
        {
            // Set up the reference to the aeroplane controller.
            m_Aeroplane = GetComponent.<AeroplaneControllerUScript>();
        }


        function FixedUpdate()
        {
        	// Read input for the pitch, yaw, roll and throttle of the aeroplane.
       		var pitch = CrossPlatformInputManager.GetAxis("Horizontal");//Input.GetAxis("Horizontal");
     		m_AirBrakes = CrossPlatformInputManager.GetButton("Fire1");           //Input.GetButton("Fire1");
     		m_Throttle = CrossPlatformInputManager.GetAxis("Vertical");//Input.GetAxis("Vertical");
#if MOBILE_INPUT
        AdjustInputForMobileControls(ref roll, ref pitch, ref m_Throttle);
#endif
            // Pass the input to the aeroplane
            m_Aeroplane.Move( pitch,  m_Throttle, m_AirBrakes);
        }


        function AdjustInputForMobileControls(roll, pitch, throttle)
        {
            // because mobile tilt is used for roll and pitch, we help out by
            // assuming that a centered level device means the user
            // wants to fly straight and level!

            // this means on mobile, the input represents the *desired* roll angle of the aeroplane,
            // and the roll input is calculated to achieve that.
            // whereas on non-mobile, the input directly controls the roll of the aeroplane.

            var intendedRollAngle = roll*maxRollAngle*Mathf.Deg2Rad;
            var intendedPitchAngle = pitch*maxPitchAngle*Mathf.Deg2Rad;
            roll = Mathf.Clamp((intendedRollAngle - m_Aeroplane.RollAngle), -1, 1);
            pitch = Mathf.Clamp((intendedPitchAngle - m_Aeroplane.PitchAngle), -1, 1);
        }
    }

