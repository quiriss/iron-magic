/*
Camera following target from side
*/

#pragma strict

public class AutoCamUScript extends PivotBasedCameraRigUScript{

        var  m_MoveSpeed: float = 3; // How fast the rig will move to keep up with target's position
           var  m_FollowVelocity = false;// Whether the rig will rotate in the direction of the target's velocity.
          private var  m_TargetVelocityLowerLimit: float = 4f;// the minimum velocity above which the camera turns towards the object's velocity. Below this we use the object's forward direction.

private var m_VelocityCameraDistanceThreshold = 0.5f;

	var m_xCameraOffsetPow:float=3;

         function Start(){
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
            
             // Debug.Log('velo: '+targetRigidbody.velocity);
            var targetPosition:Vector3 ;
            if (targetRigidbody.velocity.magnitude>m_VelocityCameraDistanceThreshold)
            {
            	var velocityClamped = Mathf.Clamp(targetRigidbody.velocity.magnitude,1,1.6);
            	targetPosition = new Vector3(Mathf.Pow(velocityClamped+1, m_xCameraOffsetPow),m_PivotOriginalPos.y, m_PivotOriginalPos.z *velocityClamped);
            }
            else
            {
            	targetPosition = m_PivotOriginalPos;
            }
            // Debug.Log('clamped: '+velocityClamped);
            if (targetPosition!= m_Pivot.localPosition)
            {
            	m_Pivot.localPosition = Vector3.Lerp( m_Pivot.localPosition, targetPosition, deltaTime/4);//*velocityClamped);
          //   Debug.Log(m_Pivot.localPosition);
            }
        }

        }


