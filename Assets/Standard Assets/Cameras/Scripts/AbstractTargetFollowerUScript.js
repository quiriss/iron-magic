public class AbstractTargetFollowerUScript extends MonoBehaviour
{
	enum UpdateType // The available methods of updating are:
    {
            FixedUpdate, // Update in FixedUpdate (for tracking rigidbodies).
            LateUpdate, // Update in LateUpdate. (for tracking objects that are moved in Update)
            ManualUpdate, // user must call to update camera
        }

     var    m_Target:Transform;            // The target object to follow
     private var   m_AutoTargetPlayer = true;  // Whether the rig should automatically target the player.
        var   m_UpdateType:UpdateType;         // stores the selected update type

        var  targetRigidbody:Rigidbody;


        function Start()
        {
            // if auto targeting is used, find the object tagged "Player"
            // any class inheriting from this should call base.Start() to perform this action!
            if (m_AutoTargetPlayer)
            {
                FindAndTargetPlayer();
            }
            if (m_Target == null) return;
            targetRigidbody = m_Target.GetComponent.<Rigidbody>();
        }


function  FixedUpdate()
        {
            // we update from here if updatetype is set to Fixed, or in auto mode,
            // if the target has a rigidbody, and isn't kinematic.
            if (m_AutoTargetPlayer && (m_Target == null || !m_Target.gameObject.activeSelf))
            {
                FindAndTargetPlayer();
            }
            if (m_UpdateType == UpdateType.FixedUpdate)
            {
                m_FollowTarget(Time.deltaTime);
            }
        }


function LateUpdate()
        {
            // we update from here if updatetype is set to Late, or in auto mode,
            // if the target does not have a rigidbody, or - does have a rigidbody but is set to kinematic.
            if (m_AutoTargetPlayer && (m_Target == null || !m_Target.gameObject.activeSelf))
            {
                FindAndTargetPlayer();
            }
            if (m_UpdateType == UpdateType.LateUpdate)
            {
                m_FollowTarget(Time.deltaTime);
            }
        }


     function ManualUpdate()
        {
            // we update from here if updatetype is set to Late, or in auto mode,
            // if the target does not have a rigidbody, or - does have a rigidbody but is set to kinematic.
            if (m_AutoTargetPlayer && (m_Target == null || !m_Target.gameObject.activeSelf))
            {
                FindAndTargetPlayer();
            }
            if (m_UpdateType == UpdateType.ManualUpdate)
            {
                m_FollowTarget(Time.deltaTime);
            }
        }

        var m_FollowTarget;//(float deltaTime);


        function FindAndTargetPlayer()
        {
            // auto target an object tagged player, if no target has been assigned
            var targetObj = GameObject.FindGameObjectWithTag("Player");
            if (targetObj)
            {
                SetTarget(targetObj.transform);
            }
        }


       function SetTarget(newTransform)
        {
            m_Target = newTransform;
        }


        function Target()
        {
            return  m_Target; 
        }
    }

