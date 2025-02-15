function apiError(error){
      if (error.includes('Unexpected') || error.includes('Failed to fetch')) {
            this.setState({
                loading: this.state.loading = false,
            });
            alert("Something went wrong!")
        }
        else {
            this.setState({
                loading: this.state.loading = false,
            });
      }
}

export default apiError;