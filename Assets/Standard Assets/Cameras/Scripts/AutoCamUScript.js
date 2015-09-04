/*
Camera following target from side
*/

#pragma strict

public class AutoCamUScript extends PivotBasedCameraRigUScript{

	var  m_MoveSpeed: float = 3; // How fast the rig will move to keep up with target's position
    var  m_FollowVelocity = false;// Whether the rig will rotate in the direction of the target's velocity.
    private var  m_TargetVelocityLowerLimit: float = 4f;// the minimum velocity above which the camera turns towards the object's velocity. Below this we use the object's forward direction.

	var m_VelocityThreshold = 0.5f;
	private var m_xCameraOffsetPow:float=3;

	@Range(-1, 2)
	var m_angleModifier :float= 0.25; //im większy współczynnik tym większy obrót kamery
	@Range(-2, 3)
	var m_xOffsetModifier:float = 0.4; //współczynnik przesunięcia kamery
			
    function Start()
    {
    	super.Start();
        m_FollowTarget = FollowTarget;//(float deltaTime);
    }


    function FollowTarget(deltaTime:float)
    {
    	// if no target, or no time passed then we quit early, as there is nothing to do
        if (!(deltaTime > 0) || m_Target == null)
        {
        	return;
        }

        // initialise some vars, we'll be modifying these in a moment
        var targetLeft = -m_Target.right;
        if (m_FollowVelocity && Application.isPlaying)
        {
        // in follow velocity mode, the camera's rotation is aligned towards the object's velocity direction
        // but only if the object is traveling faster than a given threshold.

    	    if (targetRigidbody.velocity.magnitude > m_TargetVelocityLowerLimit)
        	{
        		// velocity is high enough, so we'll use the target's velocty
            	targetLeft = targetRigidbody.velocity.normalized;
        	}
    	}            

       	// camera position moves towards target position:
        transform.position = Vector3.Lerp(transform.position, m_Target.position, deltaTime*m_MoveSpeed);
        
        AdjustCameraPosition();
        return;
        var pivotTargetPosition:Vector3 ;
        if (targetRigidbody.velocity.magnitude>m_VelocityThreshold)
        {
        	var velocityClamped = Mathf.Clamp(targetRigidbody.velocity.magnitude,1,1.6);
            pivotTargetPosition = new Vector3(Mathf.Pow(velocityClamped+1, m_xCameraOffsetPow),m_PivotOriginalPos.y, m_PivotOriginalPos.z *velocityClamped);
        }
        else
        {
        	pivotTargetPosition = m_PivotOriginalPos;
        }
        if (pivotTargetPosition!= m_Pivot.localPosition)
        {
        	m_Pivot.localPosition = Vector3.Lerp( m_Pivot.localPosition, pivotTargetPosition, deltaTime/4);//*velocityClamped);
        }
	}	
	
	function AdjustCameraPosition()
	{	
		var velocityClamped = Mathf.Clamp(targetRigidbody.velocity.magnitude,0,100);
		m_Cam.localRotation = Quaternion.Slerp(m_Cam.localRotation,
		 										Quaternion.Euler(0,m_angleModifier*velocityClamped,0),
		 										Time.deltaTime);
		var camTargetPos = m_CamOriginalPos;
		if (velocityClamped > m_VelocityThreshold)
		{
			camTargetPos = new Vector3(velocityClamped * m_xOffsetModifier,m_CamOriginalPos.y, m_CamOriginalPos.z);
		}
		m_Cam.localPosition = Vector3.Slerp(m_Cam.localPosition, camTargetPos, Time.deltaTime);

	}
}

