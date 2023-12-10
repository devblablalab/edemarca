export function toggleLearnMore(e) {
    e.preventDefault();
    const targetId = this.dataset.targetId;
    if(targetId) {
        $(`${this.dataset.targetId}`).toggleClass('active');
    }
}