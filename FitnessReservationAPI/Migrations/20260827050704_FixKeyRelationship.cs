using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FitnessReservationAPI.Migrations
{
    /// <inheritdoc />
    public partial class FixKeyRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FitnessReservations_KeyMasters_KeyMasterId",
                table: "FitnessReservations");

            migrationBuilder.DropIndex(
                name: "IX_FitnessReservations_KeyMasterId",
                table: "FitnessReservations");

            migrationBuilder.DropColumn(
                name: "KeyMasterId",
                table: "FitnessReservations");

            migrationBuilder.CreateIndex(
                name: "IX_FitnessReservations_KeyId",
                table: "FitnessReservations",
                column: "KeyId");

            migrationBuilder.AddForeignKey(
                name: "FK_FitnessReservations_KeyMasters_KeyId",
                table: "FitnessReservations",
                column: "KeyId",
                principalTable: "KeyMasters",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FitnessReservations_KeyMasters_KeyId",
                table: "FitnessReservations");

            migrationBuilder.DropIndex(
                name: "IX_FitnessReservations_KeyId",
                table: "FitnessReservations");

            migrationBuilder.AddColumn<int>(
                name: "KeyMasterId",
                table: "FitnessReservations",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_FitnessReservations_KeyMasterId",
                table: "FitnessReservations",
                column: "KeyMasterId");

            migrationBuilder.AddForeignKey(
                name: "FK_FitnessReservations_KeyMasters_KeyMasterId",
                table: "FitnessReservations",
                column: "KeyMasterId",
                principalTable: "KeyMasters",
                principalColumn: "Id");
        }
    }
}
