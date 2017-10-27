# express-trace

This repository contain an example of a node application instrumented with Stackdriver Trace to demonstrate Trace functionality.  

THIS IS NOT AN OFFICIAL GOOGLE PRODUCT

## How to use this repository

## Deploy app to Google Container Engine to see Stackdriver Monitoring for GKE
1. Update express-trace.js with references to your project
2. Update express-trace.yaml with references to your project
3. Update gcloud components - "gcloud components update"
4. Create container cluster - 
    gcloud container clusters create \
    gke-cluster --zone=us-west1-a
5. Get container external IP:
    gcloud container clusters list
5. Configure kubectl access to this cluster:
    a. kubectl config set-cluster gke-cluster --server=http://<ip address>
    b. gcloud container clusters get-credentials gke-cluser --zone=us-west1-a
6. Build the image and push it
    docker build -t gcr.io/[YOUR_PROJECT_ID]/express-trace . 
    gcloud docker -- push gcr.io/[YOUR_PROJECT_ID]/express-trace
7. Deploy this app to your cluster
    kubectl create -f express-trace.yaml
8. Expose it externally
    kubectl expose ReplicationController/express-trace --type=LoadBalancer
9. Get external IP address and validate it:
    kubectl get services (until EXTERNAL-IP is no longer pending)
    http://<ip address>:8080
9. Go see the goodness in Stackdriver!

## Deploy app to Kubernetes cluster in Google Compute Engine
1. Open Cloud Shell in Google Cloud Console
2. Make sure your project is set
    gcloud config set project <your project ID>
3. Clone the repo:
    git clone https://github.com/yuriatgoogle/stackdriver-k8s.git
    cd stackdriver-k8s
4. Download kubernetes:
    curl -sS https://get.k8s.io | bash
5. Install kubernetes and stand up cluster:
    ./kubernetes/cluster/kube-up.sh
6. Deploy this app to your cluster
    kubectl create -f express-trace.yaml
7. Expose it externally
    kubectl expose ReplicationController/express-trace --type=LoadBalancer
8. Get external IP address and validate it:
    kubectl get services (until EXTERNAL-IP is no longer pending)
    http://<ip address>:8080
9. 
